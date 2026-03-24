import { all_posts, type Article } from '$lib/load_posts';
import { load_sequences } from '$lib/load_sequences';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const sequences = await load_sequences();
	const sequence = sequences.find((s) => s.slug === params.slug);

	if (!sequence) {
		throw new Error(`Sequence "${params.slug}" not found`);
	}

	const sections = sequence.sections.map((section) => ({
		name: section.section,
		posts: section.posts
			.map((slug) => all_posts.find((p) => p.slug === slug) ?? null)
			.filter((p): p is Article => p !== null)
	}));

	return {
		name: sequence.name,
		content: sequence.content,
		sections
	};
};

export const entries: EntryGenerator = async () => {
	return await load_sequences();
};
