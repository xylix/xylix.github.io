import type { BlockContent, DefinitionContent, Html, List, Node, Parent, PhrasingContent, Root } from 'mdast';
import type { VFile } from 'vfile';

type Group = (BlockContent | DefinitionContent)[];
type AstNode = Node & { identifier?: string; value?: string };

/** Strip HTML comments and TODO/FIXME/NOTE lines from raw markdown. */
export function stripComments(raw: string): string {
	return raw.replace(/<!--[\s\S]*?-->/g, '').replace(/^(TODO|FIXME|NOTE):.*$/gm, '');
}

/**
 * Remark plugin: for posts with `format: thread`, flatten all bullet list items
 * (at any nesting depth) into paragraphs separated by thematic breaks (---),
 * so the existing thread CSS applies without changes.
 *
 * Returns an array of groups. Each group is an array of nodes (paragraph +
 * optional blockquotes) that belong to the same thread item.
 */
function collectGroupsFromList(list: List): Group[] {
	const groups: Group[] = [];
	for (const item of list.children ?? []) {
		const children = item.children ?? [];
		const hasBlockChild = children.some((c) => c.type === 'paragraph' || c.type === 'list');

		if (!hasBlockChild && children.length > 0) {
			// Tight list item: inline nodes are direct children, not wrapped in a paragraph
			groups.push([{ type: 'paragraph', children: children as PhrasingContent[] }]);
		} else {
			const group: Group = [];
			for (const child of children) {
				if (child.type === 'paragraph') {
					group.push(child);
				} else if (child.type === 'blockquote') {
					group.push(child);
				} else if (child.type === 'list') {
					if (group.length > 0) {
						groups.push([...group]);
						group.length = 0;
					}
					groups.push(...collectGroupsFromList(child));
				}
			}
			if (group.length > 0) groups.push(group);
		}
	}
	return groups;
}

function flattenListsInNode(node: Parent) {
	const newChildren: Node[] = [];
	for (const child of node.children) {
		if (child.type === 'list') {
			const groups = collectGroupsFromList(child as List);
			for (let i = 0; i < groups.length; i++) {
				newChildren.push(...groups[i]);
				if (i < groups.length - 1) {
					newChildren.push({ type: 'thematicBreak' } as Node);
				}
			}
		} else {
			if ('children' in child) flattenListsInNode(child as Parent);
			newChildren.push(child);
		}
	}
	node.children = newChildren as Parent['children'];
}

export function remarkFlattenThreadBullets() {
	return (tree: Node, file: VFile) => {
		const data = file.data as { fm?: { format?: string } };
		if (data?.fm?.format !== 'thread') return;
		flattenListsInNode(tree as Root);
	};
}

/**
 * Remark plugin: handles `[^id]` footnote references and `[^id]: text` definitions.
 * Definitions are removed from their position and appended as a numbered list in a
 * <section class="footnotes"> at the end. Works for both article and thread formats
 * (run after remarkFlattenThreadBullets so thread bullets are already paragraphs).
 */
export function remarkFootnotes() {
	function serializeChildren(nodes: PhrasingContent[] | undefined): string {
		return (nodes ?? [])
			.map((n) => {
				if (n.type === 'text') return n.value;
				if (n.type === 'inlineCode') return `<code>${n.value}</code>`;
				if (n.type === 'emphasis') return `<em>${serializeChildren(n.children)}</em>`;
				if (n.type === 'strong') return `<strong>${serializeChildren(n.children)}</strong>`;
				if (n.type === 'link')
					return `<a href="${n.url}">${serializeChildren(n.children as PhrasingContent[])}</a>`;
				if ('children' in n)
					return serializeChildren((n as Parent).children as PhrasingContent[]);
				return '';
			})
			.join('');
	}

	function processNode(node: Node, parent: Parent | null, idx: number): number | undefined {
		// [^id] is parsed by remark as a linkReference with identifier "^id"
		if (node.type === 'linkReference') {
			const m = (node as AstNode).identifier?.match(/^\^([\w-]+)$/);
			if (m && parent) {
				const id = m[1];
				parent.children.splice(idx, 1, {
					type: 'html',
					value: `<sup class="fn-ref" id="fnref-${id}"><a href="#fn-${id}">${id}</a></sup>`
				} as Html);
				return 1;
			}
		}
		if ('children' in node) {
			const p = node as Parent;
			for (let i = 0; i < p.children.length; i++) {
				const delta = processNode(p.children[i], p, i);
				if (delta !== undefined) i += delta - 1;
			}
		}
	}

	return (tree: Node) => {
		const root = tree as Root;
		const defs = new Map<string, string>();

		// Collect and remove footnote definitions.
		// [^id]: text — remark parses [^id] as a linkReference, so each definition looks like:
		//   linkReference(^id)  +  text(": content\n")  +  [other inline nodes]
		// Multiple definitions with no blank line between them land in ONE paragraph,
		// so we scan within the paragraph for each definition boundary.
		for (let i = root.children.length - 1; i >= 0; i--) {
			const node = root.children[i];
			if (node.type !== 'paragraph') continue;
			const ch = (node as Parent).children as AstNode[];
			if (ch[0]?.type !== 'linkReference' || !ch[0].identifier?.match(/^\^[\w-]+$/)) continue;

			const localDefs: [string, string][] = [];
			let j = 0;
			while (j < ch.length) {
				const ref = ch[j];
				if (ref?.type !== 'linkReference') break;
				const idMatch = ref.identifier?.match(/^\^([\w-]+)$/);
				if (!idMatch) break;
				const textNode = ch[j + 1];
				if (textNode?.type !== 'text') break;
				const tm = textNode.value?.match(/^:\s*([\s\S]*)/);
				if (!tm) break;

				// Find where this definition ends: next linkReference(^id) + text(": ")
				let k = j + 2;
				while (k < ch.length) {
					if (
						ch[k]?.type === 'linkReference' &&
						ch[k].identifier?.match(/^\^[\w-]+$/) &&
						ch[k + 1]?.type === 'text' &&
						ch[k + 1].value?.match(/^:\s*/)
					)
						break;
					k++;
				}

				const firstText = tm[1].replace(/\n$/, ''); // strip soft-break trailing newline
				const defChildren = firstText
					? [{ type: 'text', value: firstText } as Node, ...ch.slice(j + 2, k)]
					: ch.slice(j + 2, k);
				localDefs.push([idMatch[1], serializeChildren(defChildren as PhrasingContent[])]);
				j = k;
			}

			if (localDefs.length > 0 && j === ch.length) {
				for (const [id, html] of localDefs) defs.set(id, html);
				root.children.splice(i, 1);
			}
		}

		if (defs.size === 0) return;

		// Replace [^id] references with superscript links
		processNode(root, null, 0);

		// Append footnotes section
		const items = [...defs.entries()]
			.map(
				([id, html]) =>
					`<li id="fn-${id}">${html} <a href="#fnref-${id}" class="fn-back">↩</a></li>`
			)
			.join('\n');
		root.children.push({
			type: 'html',
			value: `<section class="footnotes">\n<ol>\n${items}\n</ol>\n</section>`
		} as Html);
	};
}
