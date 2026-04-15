import type { FootnoteDefinition, FootnoteReference, Node, Parent, Root } from 'mdast';
import type { VFile } from 'vfile';

/**
 * Custom mdast node type emitted by this plugin.
 * Children are the block-level mdast children from the footnote definition
 * body (typically one or more paragraph nodes, possibly followed by blockquotes
 * or lists for multi-block definitions).
 */
export interface TypstFootnoteNode extends Node {
	type: 'typstFootnote';
	children: Node[];
}

/** Walk the tree, replacing every footnoteReference with a typstFootnote node. */
function replaceReferences(
	node: Node,
	parent: Parent | null,
	idx: number,
	defs: Map<string, Node[]>
): number | undefined {
	if (node.type === 'footnoteReference') {
		const ref = node as FootnoteReference;
		if (parent) {
			const defChildren = defs.get(ref.identifier);
			if (!defChildren) {
				process.stderr.write(
					`[remark-footnotes-typst] Warning: footnote '${ref.identifier}' has no definition\n`
				);
			}
			const children: Node[] = defChildren ?? [
				{ type: 'text', value: `[missing: ${ref.identifier}]` } as Node
			];
			const fnNode = { type: 'typstFootnote', children } as unknown as Node;
			(parent.children as Node[]).splice(idx, 1, fnNode);
			return 1;
		}
	}
	if ('children' in node) {
		const p = node as Parent;
		for (let i = 0; i < p.children.length; i++) {
			const delta = replaceReferences(p.children[i], p, i, defs);
			if (delta !== undefined) i += delta - 1;
		}
	}
}

/**
 * Remark plugin: typst-specific footnote handler. Requires `remark-gfm` to be
 * used in the same processor (it provides `footnoteReference` and
 * `footnoteDefinition` node types).
 *
 * Transforms:
 *   - `footnoteDefinition` blocks → collected into a Map, removed from the tree.
 *   - `footnoteReference` inline nodes → `typstFootnote` nodes whose children
 *     are the mdast children from the matching definition.
 *
 * The `typstFootnote` nodes are serialised by `mdastToTypst` as `#footnote[...]`.
 * Typst handles numbering, placement, and back-refs natively.
 *
 * Do NOT use together with `remarkFootnotes` from remark-plugins.ts —
 * they target the same syntax.
 */
export function remarkFootnotesTypst() {
	return (tree: Node, _file: VFile) => {
		const root = tree as Root;
		const defs = new Map<string, Node[]>();
		const toRemove: number[] = [];

		// Pass 1: collect footnoteDefinition nodes (added by remark-gfm at root level)
		for (let i = 0; i < root.children.length; i++) {
			const node = root.children[i];
			if (node.type === 'footnoteDefinition') {
				const def = node as FootnoteDefinition;
				defs.set(def.identifier, def.children as unknown as Node[]);
				toRemove.push(i);
			}
		}

		// Remove definitions from tree (reverse order to keep indices stable)
		for (const idx of [...toRemove].reverse()) {
			root.children.splice(idx, 1);
		}

		if (defs.size === 0) return;

		// Pass 2: replace footnoteReference nodes within definition bodies.
		// This handles nested footnotes (e.g. [^7] referenced inside [^6]'s body).
		for (const children of defs.values()) {
			const tempRoot = { type: 'root', children } as unknown as Root;
			replaceReferences(tempRoot, null, 0, defs);
		}

		// Pass 3: replace footnoteReference nodes in the main tree
		replaceReferences(root, null, 0, defs);
	};
}
