import { all_posts, type Article } from '$lib/load_posts';
import { public_sequences, type SequenceNode } from '$lib/load_sequences';
import type { EntryGenerator, PageLoad } from './$types';

export type ResolvedNode = {
	label: string;
	post?: Article;
	children: ResolvedNode[];
};

function resolveTree(nodes: SequenceNode[], posts: Article[]): ResolvedNode[] {
	return nodes.map((node) => {
		if (node.children.length === 0) {
			const post = posts.find((p) => p.slug === node.label);
			return { label: post?.title ?? node.label, post, children: [] };
		}
		return { label: node.label, children: resolveTree(node.children, posts) };
	});
}

function collectLeafSlugs(nodes: SequenceNode[]): Set<string> {
	const slugs = new Set<string>();
	for (const node of nodes) {
		if (node.children.length === 0) {
			slugs.add(node.label);
		} else {
			for (const s of collectLeafSlugs(node.children)) {
				slugs.add(s);
			}
		}
	}
	return slugs;
}

export const load: PageLoad = async ({ params }) => {
	const sequence = public_sequences.find((s) => s.slug === params.slug);

	if (!sequence) {
		throw new Error(`Sequence "${params.slug}" not found`);
	}

	const treeSlugs = collectLeafSlugs(sequence.tree);
	const unsorted = all_posts.filter(
		(post) => post.tags.includes(params.slug) && !treeSlugs.has(post.slug)
	);

	return {
		name: sequence.name,
		tagline: sequence.tagline,
		content: sequence.content,
		hasProse: sequence.hasProse,
		tree: resolveTree(sequence.tree, all_posts),
		unsorted
	};
};

export const entries: EntryGenerator = async () => {
	return public_sequences;
};
