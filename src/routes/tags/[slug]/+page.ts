import { error } from '@sveltejs/kit';
import { all_posts } from '$lib/load_posts';
import { load_tags } from '$lib/load_tags';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const tags = await load_tags();
	const main_page = tags.find((p) => p.slug === params.slug);

	if (!main_page) {
		error(404, `Tag "${params.slug}" not found`);
	}

	const tagged = all_posts.filter((post) => post.tags.includes(params.slug));

	return {
		name: params.slug,
		content: main_page.content,
		tagged
	};
};

export const entries: EntryGenerator = async () => {
	return await load_tags();
};
