import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/**
 * Remark plugin: for posts with `format: thread`, flatten all bullet list items
 * (at any nesting depth) into paragraphs separated by thematic breaks (---),
 * so the existing thread CSS applies without changes.
 */
function collectParagraphsFromList(list) {
	const paragraphs = [];
	for (const item of list.children ?? []) {
		for (const child of item.children ?? []) {
			if (child.type === 'paragraph') {
				paragraphs.push(child);
			} else if (child.type === 'list') {
				paragraphs.push(...collectParagraphsFromList(child));
			}
		}
	}
	return paragraphs;
}

function flattenListsInNode(node) {
	if (!node.children) return;
	const newChildren = [];
	for (const child of node.children) {
		if (child.type === 'list') {
			const items = collectParagraphsFromList(child);
			for (let i = 0; i < items.length; i++) {
				newChildren.push(items[i]);
				if (i < items.length - 1) {
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
