import type { SvelteComponent } from 'svelte';

type Tag = {
	default: typeof SvelteComponent;
	metadata: MetaTag;
};

export type MetaTag = {
	link: string;
	name: string;
	updatedAt: string;
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
				throw new Error(`Missing metadata in ${path}. Needs to have name, updatedAt`);
			}
			const { name, updatedAt } = post.metadata;

			const requiredMetadata = [name, updatedAt].every((val) => val !== undefined);
			if (!requiredMetadata) {
				throw new Error(
					`Missing metadata in ${path}. Metadata present: ${Object.keys(post.metadata)}`
				);
			}
			const fname = path.replace(/^.*[\\/]/, '');
			const slug = fname.replace(/\.md$/, '');

			return {
				link: `/tag/${slug}`,
				slug,
				name,
				updatedAt: new Date(updatedAt),
				content: post.default
			};
		})
		.sort();

	return tags;
};
