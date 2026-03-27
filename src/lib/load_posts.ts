import type { SvelteComponent } from 'svelte';
import { gitMeta } from './git-meta';

export type Revision = {
	date: Date;
	added: number;
	deleted: number;
};

type Post = {
	default: typeof SvelteComponent;
	metadata: MetaArticle;
};

export type MetaArticle = {
	link: string;
	title: string;
	tagline: string;
	favourite?: boolean;
	draft?: boolean;
	/** Post display format. Defaults to 'article' when unset. */
	format?: 'thread' | 'article';
	tags: string[];
	createdAt?: string;
};

export type Article = {
	link: string;
	slug: string;
	title: string;
	tagline?: string;
	/** Post display format. Defaults to 'article' when unset. */
	format?: 'thread' | 'article';
	tags: string[];
	createdAt: Date;
	updatedAt: Revision[];
	favourite: boolean;
	draft: boolean;
	content: typeof SvelteComponent;
	wordCount: number;
};

type LoadOptions = {
	drafts?: 'include' | 'only';
};

const load_posts = async (opts?: LoadOptions): Promise<Article[]> => {
	const raw = import.meta.glob(`./posts/*.md`, { eager: true });

	const posts = Object.entries(raw)
		.map(([path, untypedPost]) => {
			const post = untypedPost as Post;
			if (!post.metadata) {
				throw new Error(`Failed to parse frontmatter in ${path}`);
			}
			const { tagline, title, tags, createdAt, favourite, draft, format } =
				post.metadata;
			const requiredMetadata = [title, tags].every((val) => val !== undefined);
			if (!requiredMetadata) {
				throw new Error(
					`Missing metadata in ${path}. Metadata present: ${Object.keys(post.metadata)}. Required: [title, tags]`
				);
			}
			const fname = path.replace(/^.*[\\/]/, '');
			const slug = fname.replace(/\.md$/, '');
			const meta = gitMeta[`src/lib/posts/${fname}`];
			const revisions = meta?.revisions ?? [];

			return {
				link: `/blog/${slug}`,
				slug,
				title,
				tagline,
				format,
				tags,
				wordCount: meta?.wordCount ?? 0,
				createdAt: createdAt ? new Date(createdAt) : (revisions.length > 0 ? new Date(revisions.at(-1)!.date) : new Date()),
				updatedAt: revisions.map((r) => ({ date: new Date(r.date), added: r.added, deleted: r.deleted })),
				content: post.default,
				favourite: !!favourite,
				draft: !!draft
			} satisfies Article;
		})
		.filter(
			(post) =>
				opts?.drafts === 'include' ||
				(opts?.drafts == 'only' && post.draft) ||
				(opts?.drafts === undefined && !post.draft)
		);

	return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const public_posts = await load_posts();
export const draft_posts = await load_posts({ drafts: 'only' });
export const all_posts = await load_posts({ drafts: 'include' });
