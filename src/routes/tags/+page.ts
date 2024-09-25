import { load_pages } from '$lib/load_posts';
import type { PageLoad } from './$types';


export const load: PageLoad = async () => {
	const pages = await load_pages();
  const tags = pages.map(p => p.tags)
  const tagMap: Map<string, string> = new Map()
  tags.flat().forEach(t => tagMap.set(t, ""))


	return {
    posts: Array.from(tagMap).map(([tag, description]) => {

      return {
        link: "/tag/" + tag,
        heading: tag,
        description: ""
      }
    })

		/*
    posts: projects.map(({ name, main_slug, description }) => {
			const post = fullPosts.find((p) => p.slug === main_slug);

			return {
				link: post!.link,
				heading: name,
				description
			};
		})
    */
	};
};
