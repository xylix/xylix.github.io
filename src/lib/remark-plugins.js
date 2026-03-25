/** @import { BlockContent, DefinitionContent, Html, List, Node, Parent, PhrasingContent, Root, ThematicBreak } from 'mdast' */
/** @import { VFile } from 'vfile' */

/** @typedef {(BlockContent | DefinitionContent)[]} Group */
/**
 * AST node extended with the optional string fields used by linkReference and
 * text nodes, so the footnote scanner doesn't need a cast on every access.
 * @typedef {Node & { identifier?: string; value?: string }} AstNode
 */

/**
 * Remark plugin: for posts with `format: thread`, flatten all bullet list items
 * (at any nesting depth) into paragraphs separated by thematic breaks (---),
 * so the existing thread CSS applies without changes.
 *
 * Returns an array of groups. Each group is an array of nodes (paragraph +
 * optional blockquotes) that belong to the same thread item.
 * @param {List} list
 * @returns {Group[]}
 */
function collectGroupsFromList(list) {
	/** @type {Group[]} */
	const groups = [];
	for (const item of list.children ?? []) {
		const children = item.children ?? [];
		const hasBlockChild = children.some((c) => c.type === 'paragraph' || c.type === 'list');

		if (!hasBlockChild && children.length > 0) {
			// Tight list item: inline nodes are direct children, not wrapped in a paragraph
			groups.push([{ type: 'paragraph', children: /** @type {PhrasingContent[]} */ (children) }]);
		} else {
			/** @type {Group} */
			const group = [];
			for (const child of children) {
				if (child.type === 'paragraph') {
					group.push(child);
				} else if (child.type === 'blockquote') {
					group.push(child); // keep blockquote with its parent paragraph
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

/** @param {Parent} node */
function flattenListsInNode(node) {
	/** @type {Node[]} */
	const newChildren = [];
	for (const child of node.children) {
		if (child.type === 'list') {
			const groups = collectGroupsFromList(/** @type {List} */ (child));
			for (let i = 0; i < groups.length; i++) {
				newChildren.push(...groups[i]);
				if (i < groups.length - 1) {
					newChildren.push(/** @type {ThematicBreak} */ ({ type: 'thematicBreak' }));
				}
			}
		} else {
			if ('children' in child) flattenListsInNode(/** @type {Parent} */ (child));
			newChildren.push(child);
		}
	}
	node.children = /** @type {Parent['children']} */ (newChildren);
}

export function remarkFlattenThreadBullets() {
	/**
	 * @param {import('unist').Node} tree
	 * @param {VFile} file
	 */
	return (tree, file) => {
		if (/** @type {any} */ (file.data)?.fm?.format !== 'thread') return;
		flattenListsInNode(/** @type {Root} */ (tree));
	};
}

/**
 * Remark plugin: handles `[^id]` footnote references and `[^id]: text` definitions.
 * Definitions are removed from their position and appended as a numbered list in a
 * <section class="footnotes"> at the end. Works for both article and thread formats
 * (run after remarkFlattenThreadBullets so thread bullets are already paragraphs).
 */
export function remarkFootnotes() {
	/**
	 * @param {PhrasingContent[] | undefined} nodes
	 * @returns {string}
	 */
	function serializeChildren(nodes) {
		return (nodes ?? [])
			.map((n) => {
				if (n.type === 'text') return n.value;
				if (n.type === 'inlineCode') return `<code>${n.value}</code>`;
				if (n.type === 'emphasis') return `<em>${serializeChildren(n.children)}</em>`;
				if (n.type === 'strong') return `<strong>${serializeChildren(n.children)}</strong>`;
				if (n.type === 'link')
					return `<a href="${n.url}">${serializeChildren(/** @type {PhrasingContent[]} */ (n.children))}</a>`;
				if ('children' in n)
					return serializeChildren(/** @type {PhrasingContent[]} */ (n.children));
				return '';
			})
			.join('');
	}

	/**
	 * @param {Node} node
	 * @param {Parent | null} parent
	 * @param {number} idx
	 * @returns {number | undefined}
	 */
	function processNode(node, parent, idx) {
		// [^id] is parsed by remark as a linkReference with identifier "^id"
		if (node.type === 'linkReference') {
			const m = /** @type {AstNode} */ (node).identifier?.match(/^\^([\w-]+)$/);
			if (m && parent) {
				const id = m[1];
				parent.children.splice(
					idx,
					1,
					/** @type {Html} */ ({
						type: 'html',
						value: `<sup class="fn-ref" id="fnref-${id}"><a href="#fn-${id}">${id}</a></sup>`
					})
				);
				return 1;
			}
		}
		if ('children' in node) {
			const p = /** @type {Parent} */ (node);
			for (let i = 0; i < p.children.length; i++) {
				const delta = processNode(p.children[i], p, i);
				if (delta !== undefined) i += delta - 1;
			}
		}
	}

	/** @param {import('unist').Node} tree */
	return (tree) => {
		const root = /** @type {Root} */ (tree);
		/** @type {Map<string, string>} */
		const defs = new Map();

		// Collect and remove footnote definitions.
		// [^id]: text — remark parses [^id] as a linkReference, so each definition looks like:
		//   linkReference(^id)  +  text(": content\n")  +  [other inline nodes]
		// Multiple definitions with no blank line between them land in ONE paragraph,
		// so we scan within the paragraph for each definition boundary.
		for (let i = root.children.length - 1; i >= 0; i--) {
			const node = root.children[i];
			if (node.type !== 'paragraph') continue;
			const ch = /** @type {AstNode[]} */ (/** @type {Parent} */ (node).children);
			if (ch[0]?.type !== 'linkReference' || !ch[0].identifier?.match(/^\^[\w-]+$/)) continue;

			/** @type {[string, string][]} */
			const localDefs = [];
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
					? [/** @type {Node} */ ({ type: 'text', value: firstText }), ...ch.slice(j + 2, k)]
					: ch.slice(j + 2, k);
				localDefs.push([idMatch[1], serializeChildren(/** @type {PhrasingContent[]} */ (defChildren))]);
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
		root.children.push(
			/** @type {Html} */ ({
				type: 'html',
				value: `<section class="footnotes">\n<ol>\n${items}\n</ol>\n</section>`
			})
		);
	};
}
