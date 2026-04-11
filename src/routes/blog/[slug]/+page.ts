import { error } from '@sveltejs/kit';
import { all_posts } from '$lib/load_posts';
import { public_sequences, type SequenceNode } from '$lib/load_sequences';
import type { EntryGenerator, PageLoad } from './$types';

function findBreadcrumb(tree: SequenceNode[], slug: string): string[] | null {
	for (const node of tree) {
		if (node.children.length === 0 && node.label.split(/\s*\/\s*/).includes(slug)) {
			return [];
		}
		const sub = findBreadcrumb(node.children, slug);
		if (sub !== null) {
			return [node.label, ...sub];
		}
	}
	return null;
}

export const load: PageLoad = async ({ params }) => {
	const main_post = all_posts.find((p) => p.slug === params.slug);
	if (!main_post) {
		error(404, `No post found with slug "${params.slug}"`);
	}

	const sequenceBreadcrumbs: { sequenceSlug: string; sequenceName: string; path: string[] }[] = [];
	for (const seq of public_sequences) {
		const path = findBreadcrumb(seq.tree, params.slug);
		if (path !== null) {
			sequenceBreadcrumbs.push({ sequenceSlug: seq.slug, sequenceName: seq.name, path });
		}
	}

	const similar = all_posts
		.filter((post) => post.slug !== main_post?.slug && !post.draft)
		.map((post) => {
			return {
				post,
				overlap: post.tags.filter((t) => main_post?.tags.includes(t)).length
			};
		})
		.filter((pair) => pair.overlap > 0)
		.sort((a, b) => {
			if (a.overlap !== b.overlap) {
				return a.overlap - b.overlap;
			}

			return b.post.createdAt.getTime() - a.post.createdAt.getTime();
		})
		.map(({ post }) => post);

	return {
		title: main_post.title,
		subtitle: main_post.tagline,
		format: main_post.format,
		content: main_post.content,
		slug: main_post.slug,
		tags: main_post.tags,
		updatedAt: main_post.updatedAt,
		createdAt: main_post.createdAt,
		similar,
		sequenceBreadcrumbs
	};
};

export const entries: EntryGenerator = async () => {
	return all_posts;
};
