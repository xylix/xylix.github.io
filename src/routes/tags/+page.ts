import { load_tags } from '$lib/load_tags';
import { load_pages } from '$lib/load_posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const tags = await load_tags();
	const posts = await load_pages();
	const tagsInPosts = posts.map((post) => post.tags).flat();

	const tagNames = tags.map((tag) => tag.name);
	tagsInPosts.forEach((postTag) => {
		if (!tagNames.includes(postTag)) {
			console.warn(`Tag ${postTag} does not have a corresponding tag page`);
			// throw new Error(`Tag ${postTag} does not have a corresponding tag page`);
		}
	});
	tags.forEach((tag) => {
		if (tag.content.toString() === '') {
			console.warn(tag.name);
		}
	});

	return {
		posts: tags.map((tag) => {
			return {
				link: `tags/${tag.slug}`,
				heading: tag.name,
				description: ''
			};
		})
	};
};
