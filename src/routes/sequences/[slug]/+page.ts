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

export const load: PageLoad = async ({ params }) => {
	const sequence = public_sequences.find((s) => s.slug === params.slug);

	if (!sequence) {
		throw new Error(`Sequence "${params.slug}" not found`);
	}

	return {
		name: sequence.name,
		tagline: sequence.tagline,
		tree: resolveTree(sequence.tree, all_posts)
	};
};

export const entries: EntryGenerator = async () => {
	return public_sequences;
};
