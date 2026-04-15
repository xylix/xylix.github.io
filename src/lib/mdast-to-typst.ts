import type { Node, Parent, Root } from 'mdast';

type AstNode = Node & { [key: string]: unknown };

// ---------------------------------------------------------------------------
// Character escaping for typst markup mode
// ---------------------------------------------------------------------------

/**
 * Escape text content for typst markup mode.
 * Handles always-special chars (\ # $ @) and markup-triggering chars (* _),
 * plus line-start chars that open typst constructs (= - + / *).
 * Do NOT call on code block content — typst raw blocks pass through literally.
 */
function escapeTypst(text: string): string {
	return text
		.split('\n')
		.map((line) => {
			let out = line
				.replace(/\\/g, '\\\\')
				.replace(/#/g, '\\#')
				.replace(/\$/g, '\\$')
				.replace(/@/g, '\\@')
				.replace(/\*/g, '\\*')
				.replace(/_/g, '\\_');
			// Chars that open typst constructs when at line start
			if (/^[=\-+/]/.test(out)) {
				out = '\\' + out;
			}
			return out;
		})
		.join('\n');
}

// ---------------------------------------------------------------------------
// Serialiser (closure-based so headingOffset is captured once)
// ---------------------------------------------------------------------------

function makeSerializer(headingOffset: number) {
	function serializeInline(node: Node): string {
		const n = node as AstNode;
		switch (node.type) {
			case 'text':
				return escapeTypst(n.value as string);

			case 'emphasis':
				return `_${(n.children as Node[]).map(serializeInline).join('')}_`;

			case 'strong':
				return `*${(n.children as Node[]).map(serializeInline).join('')}*`;

			case 'inlineCode': {
				const v = n.value as string;
				// If content contains backticks, fall back to the raw() function
				return v.includes('`') ? `#raw(${JSON.stringify(v)})` : `\`${v}\``;
			}

			case 'link': {
				const label = (n.children as Node[]).map(serializeInline).join('');
				return `#link("${n.url as string}")[${label}]`;
			}

			case 'image': {
				// Rewrite site-root paths like /foo.jpg → static/foo.jpg so typst
				// can find the file when compiled from the repo root.
				const src = (n.url as string).startsWith('/')
					? `static${n.url as string}`
					: (n.url as string);
				const alt = n.alt ? `, alt: ${JSON.stringify(n.alt as string)}` : '';
				return `#image("${src}", width: 80%${alt})`;
			}

			case 'break':
				return ' \\\n';

			case 'typstFootnote': {
				// Children are the block-level nodes from the footnote definition
				// (typically one paragraph, sometimes followed by block content).
				// serializeBlock ends with \n\n; we trim only the trailing whitespace
				// so multiple paragraphs stay separated inside the #footnote[...].
				const content = (n.children as Node[])
					.map((c) => (isBlockType(c.type) ? serializeBlock(c) : serializeInline(c)))
					.join('')
					.trimEnd();
				return `#footnote[${content}]`;
			}

			// These nodes should have been removed by the pipeline; skip silently.
			case 'html':
			case 'linkReference':
			case 'imageReference':
				return '';

			default:
				if ('children' in node) {
					return (node as Parent).children.map(serializeInline).join('');
				}
				process.stderr.write(`[mdast-to-typst] Unknown inline node: ${node.type}\n`);
				return '';
		}
	}

	function isBlockType(type: string): boolean {
		return ['paragraph', 'heading', 'code', 'list', 'blockquote', 'thematicBreak', 'html'].includes(
			type
		);
	}

	function serializeBlock(node: Node): string {
		const n = node as AstNode;
		switch (node.type) {
			case 'paragraph':
				return (n.children as Node[]).map(serializeInline).join('') + '\n\n';

			case 'heading': {
				const depth = Math.min((n.depth as number) + headingOffset, 6);
				const prefix = '='.repeat(depth);
				return `${prefix} ${(n.children as Node[]).map(serializeInline).join('')}\n\n`;
			}

			case 'code': {
				const lang = (n.lang as string | null) ?? '';
				// Code content is NOT escaped — typst raw blocks pass through literally.
				return `\`\`\`${lang}\n${n.value as string}\n\`\`\`\n\n`;
			}

			case 'list':
				return serializeList(node, 0) + '\n\n';

			case 'blockquote': {
				const inner = (n.children as Node[]).map(serializeBlock).join('').trimEnd();
				return `#quote(block: true)[\n${inner}\n]\n\n`;
			}

			case 'thematicBreak':
				return `#line(length: 100%, stroke: 0.5pt + gray)\n\n`;

			case 'html':
				// HTML nodes are skipped; they come from inline HTML the typst path
				// has no use for (e.g. <details> wrappers in posts).
				return '';

			default:
				process.stderr.write(`[mdast-to-typst] Unknown block node: ${node.type}\n`);
				return '';
		}
	}

	function serializeList(node: Node, depth: number): string {
		const n = node as AstNode;
		const marker = (n.ordered as boolean) ? '+' : '-';
		return (n.children as Node[])
			.map((item) => serializeListItem(item, marker, depth))
			.join('\n');
	}

	function serializeListItem(node: Node, marker: string, depth: number): string {
		const n = node as AstNode;
		const indent = '  '.repeat(depth);
		const lines: string[] = [];
		let firstPara = true;

		for (const child of n.children as Node[]) {
			if (child.type === 'paragraph') {
				const text = ((child as AstNode).children as Node[]).map(serializeInline).join('');
				if (firstPara) {
					lines.push(`${indent}${marker} ${text}`);
					firstPara = false;
				} else {
					// Continuation paragraph in a loose list item
					lines.push(`\n${indent}  ${text}`);
				}
			} else if (child.type === 'list') {
				lines.push(serializeList(child, depth + 1));
			} else {
				const rendered = serializeBlock(child).trimEnd();
				if (rendered) lines.push(rendered);
			}
		}

		return lines.join('\n');
	}

	return function serialize(tree: Root): string {
		return tree.children.map(serializeBlock).join('');
	};
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export type MdastToTypstOptions = {
	/**
	 * Shift all heading depths by this amount.
	 * Use headingOffset: 1 when the orchestrator already emits a level-1 post
	 * title, so in-body headings start at level 2 and don't trigger page breaks.
	 */
	headingOffset?: number;
};

export function mdastToTypst(tree: Root, options?: MdastToTypstOptions): string {
	return makeSerializer(options?.headingOffset ?? 0)(tree);
}
