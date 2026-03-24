import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/**
 * Remark plugin: for posts with `format: thread`, flatten all bullet list items
 * (at any nesting depth) into paragraphs separated by thematic breaks (---),
 * so the existing thread CSS applies without changes.
 */
// Returns an array of groups. Each group is an array of nodes (paragraph + optional
// blockquotes) that belong to the same thread node, separated by thematicBreaks.
function collectGroupsFromList(list) {
	const groups = [];
	for (const item of list.children ?? []) {
		const children = item.children ?? [];
		const hasBlockChild = children.some((c) => c.type === 'paragraph' || c.type === 'list');

		if (!hasBlockChild && children.length > 0) {
			// Tight list item: inline nodes are direct children, not wrapped in a paragraph
			groups.push([{ type: 'paragraph', children }]);
		} else {
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

function flattenListsInNode(node) {
	if (!node.children) return;
	const newChildren = [];
	for (const child of node.children) {
		if (child.type === 'list') {
			const groups = collectGroupsFromList(child);
			for (let i = 0; i < groups.length; i++) {
				newChildren.push(...groups[i]);
				if (i < groups.length - 1) {
					newChildren.push({ type: 'thematicBreak' });
				}
			}
		} else {
			flattenListsInNode(child);
			newChildren.push(child);
		}
	}
	node.children = newChildren;
}

function remarkFlattenThreadBullets() {
	return (tree, file) => {
		if (file.data?.fm?.format !== 'thread') return;
		flattenListsInNode(tree);
	};
}

/**
 * Remark plugin: handles `[^id]` footnote references and `[^id]: text` definitions.
 * Definitions are removed from their position and appended as a numbered list in a
 * <section class="footnotes"> at the end. Works for both article and thread formats
 * (run after remarkFlattenThreadBullets so thread bullets are already paragraphs).
 */
function remarkFootnotes() {
	function serializeChildren(nodes) {
		return (nodes ?? [])
			.map((n) => {
				if (n.type === 'text') return n.value;
				if (n.type === 'inlineCode') return `<code>${n.value}</code>`;
				if (n.type === 'emphasis') return `<em>${serializeChildren(n.children)}</em>`;
				if (n.type === 'strong') return `<strong>${serializeChildren(n.children)}</strong>`;
				if (n.type === 'link') return `<a href="${n.url}">${serializeChildren(n.children)}</a>`;
				return serializeChildren(n.children ?? []);
			})
			.join('');
	}

	function processNode(node, parent, idx) {
		// [^id] is parsed by remark as a linkReference with identifier "^id"
		if (node.type === 'linkReference') {
			const m = node.identifier?.match(/^\^([\w-]+)$/);
			if (m && parent) {
				const id = m[1];
				parent.children.splice(idx, 1, {
					type: 'html',
					value: `<sup class="fn-ref" id="fnref-${id}"><a href="#fn-${id}">${id}</a></sup>`
				});
				return 1;
			}
		}
		if (node.children) {
			for (let i = 0; i < node.children.length; i++) {
				const delta = processNode(node.children[i], node, i);
				if (delta !== undefined) i += delta - 1;
			}
		}
	}

	return (tree) => {
		const defs = new Map();

		// Collect and remove footnote definitions: paragraphs starting with [^id]:
		for (let i = tree.children.length - 1; i >= 0; i--) {
			const node = tree.children[i];
			if (node.type !== 'paragraph') continue;
			const first = node.children[0];
			if (first?.type !== 'text') continue;
			const m = first.value.match(/^\[\^([\w-]+)\]:\s*([\s\S]*)/);
			if (!m) continue;
			const rest = m[2];
			const children = rest
				? [{ ...first, value: rest }, ...node.children.slice(1)]
				: node.children.slice(1);
			defs.set(m[1], serializeChildren(children));
			tree.children.splice(i, 1);
		}

		if (defs.size === 0) return;

		// Replace [^id] references with superscript links
		processNode(tree, null, 0);

		// Append footnotes section
		const items = [...defs.entries()]
			.map(([id, html]) => `<li id="fn-${id}">${html} <a href="#fnref-${id}" class="fn-back">↩</a></li>`)
			.join('\n');
		tree.children.push({
			type: 'html',
			value: `<section class="footnotes">\n<ol>\n${items}\n</ol>\n</section>`
		});
	};
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			highlight: { alias: { rs: 'rust' } },
			remarkPlugins: [remarkFlattenThreadBullets, remarkFootnotes]
		})
	],
	extensions: ['.svelte', '.md'],

	kit: { adapter: adapterStatic(), prerender: { entries: ['*', '/'] } }
};

export default config;
