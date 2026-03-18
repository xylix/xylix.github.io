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

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			highlight: { alias: { rs: 'rust' } },
			remarkPlugins: [remarkFlattenThreadBullets]
		})
	],
	extensions: ['.svelte', '.md'],

	kit: { adapter: adapterStatic(), prerender: { entries: ['*', '/'] } }
};

export default config;
