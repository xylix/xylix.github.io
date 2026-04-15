import type {
	BlockContent,
	Code,
	Heading,
	Image,
	InlineCode,
	Link,
	List,
	ListItem,
	Node,
	Paragraph,
	PhrasingContent,
	Root,
	Text
} from 'mdast';
import type { TypstFootnoteNode } from './remark-footnotes-typst';

function escapeTypstString(value: string): string {
	return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function escapeText(value: string): string {
	return value
		.replace(/\\/g, '\\\\')
		.replace(/([#$@<>\[\]*_`()~])/g, '\\$1')
		.replace(/(^|\n)([=+\-/*])/g, '$1\\$2');
}

function imagePath(url: string): string {
	if (url.startsWith('/')) return `../static${url}`;
	return url;
}

type PhrasingOrTypstFootnote = PhrasingContent | TypstFootnoteNode;

function renderInline(
	nodes: PhrasingOrTypstFootnote[] = [],
	options?: { insideStyled?: boolean }
): string {
	return nodes.map((node) => renderInlineNode(node, options)).join('');
}

function renderStyledInline(
	kind: 'emphasis' | 'strong',
	children: PhrasingOrTypstFootnote[],
	options?: { insideStyled?: boolean }
): string {
	const renderedChildren = renderInline(children, { insideStyled: true });
	const hasStyledChild = children.some((child) => child.type === 'emphasis' || child.type === 'strong');

	if (options?.insideStyled || hasStyledChild) {
		if (kind === 'emphasis') {
			return `#emph[${renderedChildren}]`;
		}
		return `#strong[${renderedChildren}]`;
	}

	if (kind === 'emphasis') {
		return `_${renderedChildren}_`;
	}
	return `*${renderedChildren}*`;
}

function renderInlineNode(node: PhrasingOrTypstFootnote, options?: { insideStyled?: boolean }): string {
	switch (node.type) {
		case 'text':
			return escapeText((node as Text).value);
		case 'emphasis':
			return renderStyledInline('emphasis', node.children, options);
		case 'strong':
			return renderStyledInline('strong', node.children, options);
		case 'delete':
			return `#strike[${renderInline(node.children, { insideStyled: true })}]`;
		case 'inlineCode': {
			const value = (node as InlineCode).value;
			if (value.includes('`')) {
				return `#raw("${escapeTypstString(value)}")`;
			}
			return `\`${value}\``;
		}
		case 'link': {
			const { url, children } = node as Link;
			return `#link("${escapeTypstString(url)}")[${renderInline(children, options)}]`;
		}
		case 'image': {
			const { url, alt } = node as Image;
			const resolved = imagePath(url);
			const caption = alt ? `, caption: [${escapeText(alt)}]` : '';
			return `#figure(image("${escapeTypstString(resolved)}", width: 80%)${caption})`;
		}
		case 'break':
			return '\\\n';
		case 'html':
			return '';
		case 'linkReference':
			return '';
		case 'typstFootnote': {
			const { children } = node;
			return `#footnote[${renderInline(children, { insideStyled: true })}]`;
		}
		default:
			if ('children' in node) {
				return renderInline((node.children as PhrasingContent[]) ?? [], options);
			}
			return '';
	}
}

function renderListItem(item: ListItem, ordered: boolean, depth: number): string[] {
	const indent = '  '.repeat(depth);
	const marker = ordered ? '+' : '-';
	const lines: string[] = [];
	const blocks = item.children as BlockContent[];
	const firstParagraph = blocks.find((block) => block.type === 'paragraph') as Paragraph | undefined;
	lines.push(`${indent}${marker} ${firstParagraph ? renderInline(firstParagraph.children) : ''}`.trimEnd());

	for (const block of blocks) {
		if (block === firstParagraph) continue;
		if (block.type === 'list') {
			lines.push(renderList(block as List, depth + 1));
			continue;
		}
		const rendered = renderBlock(block, depth + 1);
		if (!rendered) continue;
		lines.push(
			...rendered
				.split('\n')
				.filter(Boolean)
				.map((line) => `${indent}  ${line}`)
		);
	}

	return lines;
}

function renderList(list: List, depth = 0): string {
	return list.children.flatMap((item) => renderListItem(item as ListItem, !!list.ordered, depth)).join('\n');
}

function renderBlock(node: Node, depth = 0): string {
	switch (node.type) {
		case 'paragraph':
			return renderInline((node as Paragraph).children);
		case 'heading': {
			const heading = node as Heading;
			const level = Math.min(heading.depth + depth, 6);
			return `${'='.repeat(level)} ${renderInline(heading.children)}`;
		}
		case 'blockquote': {
			const body = (((node as { children?: BlockContent[] }).children as BlockContent[]) ?? [])
				.map((child) => renderBlock(child, depth + 1))
				.filter(Boolean)
				.join('\n\n');
			return `#quote(block: true)[${body}]`;
		}
		case 'list':
			return renderList(node as List, depth);
		case 'code': {
			const { lang, value } = node as Code;
			const fence = '```';
			const langSuffix = lang ? lang : '';
			return `${fence}${langSuffix}\n${value}\n${fence}`;
		}
		case 'thematicBreak':
			return '#line(length: 100%, stroke: 0.5pt + gray)';
		case 'html':
			return '';
		default:
			return '';
	}
}

export function mdastToTypst(tree: Root, options?: { headingOffset?: number }): string {
	const headingOffset = options?.headingOffset ?? 0;
	return tree.children
		.map((child) => renderBlock(child, headingOffset))
		.filter((block) => block.trim().length > 0)
		.join('\n\n');
}
