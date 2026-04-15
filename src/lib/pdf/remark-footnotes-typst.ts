import type {
	BlockContent,
	FootnoteDefinition,
	List,
	Node,
	Parent,
	PhrasingContent,
	Root
} from 'mdast';

type AstNode = Node & { identifier?: string; value?: string };

export type TypstFootnoteNode = {
	type: 'typstFootnote';
	children: PhrasingContent[];
};

function cloneNode<T>(node: T): T {
	return structuredClone(node);
}

function blockToPhrasing(node: Node): PhrasingContent[] {
	switch (node.type) {
		case 'paragraph':
			return cloneNode((node as Parent).children as PhrasingContent[]);
		case 'blockquote':
			return [
				{
					type: 'text',
					value: '> '
				},
				...joinPhrasingBlocks((node as Parent).children as Node[])
			] as PhrasingContent[];
		case 'list':
			return listToPhrasing(node as List);
		case 'listItem':
			return joinPhrasingBlocks((node as Parent).children as Node[]);
		default:
			return [];
	}
}

function listToPhrasing(list: List, depth = 0): PhrasingContent[] {
	const parts: PhrasingContent[] = [];
	const indent = '  '.repeat(depth);
	const marker = list.ordered ? '+ ' : '- ';

	for (const [index, item] of (list.children ?? []).entries()) {
		if (index > 0) {
			parts.push({ type: 'text', value: '\n' });
		}

		parts.push({ type: 'text', value: `${indent}${marker}` });
		const itemChildren = (item.children ?? []) as Node[];
		let wroteContent = false;

		for (const child of itemChildren) {
			if (child.type === 'list') {
				parts.push({ type: 'text', value: `\n${indent}  ` });
				parts.push(...listToPhrasing(child as List, depth + 1));
				wroteContent = true;
				continue;
			}

			const phrasing = blockToPhrasing(child);
			if (phrasing.length === 0) continue;
			if (wroteContent) {
				parts.push({ type: 'text', value: `\n${indent}  ` });
			}
			parts.push(...phrasing);
			wroteContent = true;
		}
	}

	return parts;
}

function joinPhrasingBlocks(nodes: Node[]): PhrasingContent[] {
	const joined: PhrasingContent[] = [];
	for (const [index, node] of nodes.entries()) {
		if (index > 0) {
			joined.push({ type: 'text', value: '\n' });
		}
		joined.push(...blockToPhrasing(node));
	}
	return joined;
}

function processNode(node: Node, parent: Parent | null, idx: number, defs: Map<string, PhrasingContent[]>) {
	if (node.type === 'footnoteReference') {
		const id = (node as AstNode).identifier;
		if (id && parent) {
			const children = defs.get(id) ?? ([{ type: 'text', value: `<missing footnote: ${id}>` }] as PhrasingContent[]);
			parent.children.splice(idx, 1, {
				type: 'typstFootnote',
				children: cloneNode(children)
			} as unknown as never);
			return 1;
		}
	}

	if (node.type === 'linkReference') {
		const m = (node as AstNode).identifier?.match(/^\^([\w-]+)$/);
		if (m && parent) {
			const id = m[1];
			const children = defs.get(id) ?? ([{ type: 'text', value: `<missing footnote: ${id}>` }] as PhrasingContent[]);
			parent.children.splice(idx, 1, {
				type: 'typstFootnote',
				children: cloneNode(children)
			} as unknown as never);
			return 1;
		}
	}

	if ('children' in node) {
		const p = node as Parent;
		for (let i = 0; i < p.children.length; i++) {
			const delta = processNode(p.children[i], p, i, defs);
			if (delta !== undefined) i += delta - 1;
		}
	}
}

export function remarkFootnotesTypst() {
	return (tree: Node) => {
		const root = tree as Root;
		const defs = new Map<string, PhrasingContent[]>();

		const nativeDefinitions = root.children.filter(
			(child): child is FootnoteDefinition => child.type === 'footnoteDefinition'
		);
		if (nativeDefinitions.length > 0) {
			for (let i = root.children.length - 1; i >= 0; i--) {
				const child = root.children[i];
				if (child.type !== 'footnoteDefinition') continue;

				const blocks = [...((child as FootnoteDefinition).children as Node[])];
				let continuationCount = 0;
				while (i + 1 + continuationCount < root.children.length) {
					const next = root.children[i + 1 + continuationCount];
					if (next.type === 'blockquote' || next.type === 'list') {
						blocks.push(next);
						continuationCount++;
						continue;
					}
					break;
				}

				defs.set((child as FootnoteDefinition).identifier, joinPhrasingBlocks(blocks));
				root.children.splice(i, 1 + continuationCount);
			}
			processNode(root, null, 0, defs);
			return;
		}

		for (let i = root.children.length - 1; i >= 0; i--) {
			const node = root.children[i];
			if (node.type !== 'paragraph') continue;
			const ch = (node as Parent).children as AstNode[];
			if (ch[0]?.type !== 'linkReference' || !ch[0].identifier?.match(/^\^[\w-]+$/)) continue;

			const localDefs: [string, PhrasingContent[]][] = [];
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

				let k = j + 2;
				while (k < ch.length) {
					if (
						ch[k]?.type === 'linkReference' &&
						ch[k].identifier?.match(/^\^[\w-]+$/) &&
						ch[k + 1]?.type === 'text' &&
						ch[k + 1].value?.match(/^:\s*/)
					) {
						break;
					}
					k++;
				}

				const firstText = tm[1].replace(/\n$/, '');
				const defChildren = firstText
					? ([{ type: 'text', value: firstText }, ...ch.slice(j + 2, k)] as PhrasingContent[])
					: (ch.slice(j + 2, k) as PhrasingContent[]);
				localDefs.push([idMatch[1], cloneNode(defChildren)]);
				j = k;
			}

			if (localDefs.length > 0 && j === ch.length) {
				let continuationCount = 0;
				while (i + 1 + continuationCount < root.children.length) {
					const next = root.children[i + 1 + continuationCount];
					if (next.type === 'blockquote' || next.type === 'list') {
						continuationCount++;
					} else {
						break;
					}
				}

				if (continuationCount > 0) {
					const continuationNodes = root.children.slice(i + 1, i + 1 + continuationCount);
					localDefs[localDefs.length - 1][1].push(
						{ type: 'text', value: '\n' },
						...joinPhrasingBlocks(continuationNodes)
					);
				}

				for (const [id, children] of localDefs) defs.set(id, children);
				root.children.splice(i, 1 + continuationCount);
			}
		}

		if (defs.size === 0) return;
		processNode(root, null, 0, defs);
	};
}
