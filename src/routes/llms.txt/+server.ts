import { public_posts, type Article } from '$lib/load_posts';
import { load_tags, type TagArticle } from '$lib/load_tags';
import { title, website } from '../constants';

export const prerender = true;

const rawFiles = import.meta.glob('../../lib/posts/*.md', { eager: true, as: 'raw' });

function stripFrontmatter(raw: string): string {
	if (!raw.startsWith('---')) return raw;
	const end = raw.indexOf('---', 3);
	if (end === -1) return raw;
	return raw.slice(end + 3).trimStart();
}

const contentBySlug = Object.fromEntries(
	Object.entries(rawFiles).map(([path, raw]) => {
		const slug = path.replace(/^.*[\\/]/, '').replace(/\.md$/, '');
		return [slug, stripFrontmatter(raw as string)];
	})
);

export async function GET() {
	const tags = await load_tags();
	return new Response(format(public_posts, tags), {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}

const format = (posts: Article[], tags: TagArticle[]) => {
	const postSections = posts
		.map((post) => {
			const url = `${website}${post.link}`;
			const date = post.createdAt.toISOString().slice(0, 10);
			const tagList = post.tags.join(', ');
			const content = contentBySlug[post.slug] ?? '';
			const tagline = post.tagline ? `> ${post.tagline}\n\n` : '';
			return `## ${post.title}\n\n${url} | ${date} | tags: ${tagList}\n\n${tagline}${content}`;
		})
		.join('\n\n---\n\n');

	const tagLines = tags.map((tag) => `- [${tag.name}](${website}/tags/${tag.slug})`).join('\n');

	return `# ${title}

> ${website}

Xylix thinks aloud here. Topics include but not limited to: Rationality, programming, books, writing and role-playing games.

## Tags

${tagLines}

---

${postSections}
`;
};
