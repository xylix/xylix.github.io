import type { SvelteComponent } from 'svelte';
import { gitMeta } from './git-meta';

type Tag = {
	default: typeof SvelteComponent;
	metadata: MetaTag;
};

export type MetaTag = {
	link: string;
	name: string;
};

export type TagArticle = {
	link: string;
	slug: string;
	name: string;
	updatedAt: Date;
	content: typeof SvelteComponent;
};

export const load_tags = async (): Promise<TagArticle[]> => {
	const raw = import.meta.glob(`./tags/*.md`, { eager: true });

	const tags = Object.entries(raw)
		.map(([path, untypedTag]) => {
			const post = untypedTag as Tag;

			if (!post.metadata) {
				throw new Error(`Missing metadata in ${path}. Needs to have name`);
			}
			const { name } = post.metadata;

			if (!name) {
				throw new Error(
					`Missing metadata in ${path}. Metadata present: ${Object.keys(post.metadata)}`
				);
			}
			const fname = path.replace(/^.*[\\/]/, '');
			const slug = fname.replace(/\.md$/, '');
			const meta = gitMeta[`src/lib/tags/${fname}`];

			return {
				link: `/tag/${slug}`,
				slug,
				name,
				updatedAt: meta?.dates[0] ? new Date(meta.dates[0]) : new Date(),
				content: post.default
			};
		})
		.sort();

	return tags;
};
