import { public_posts, type Article } from '$lib/load_posts';
import { load_tags, type TagArticle } from '$lib/load_tags';
import { title, website } from '../constants';

export const prerender = true;

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
	const postLines = posts
		.map((post) => {
			const url = `${website}${post.link}`;
			const date = post.createdAt.toISOString().slice(0, 10);
			const tagList = post.tags.join(', ');
			const lines = [`- [${post.title}](${url}) (${date}) [${tagList}]`];
			if (post.tagline) lines.push(`  ${post.tagline}`);
			return lines.join('\n');
		})
		.join('\n');

	const tagLines = tags.map((tag) => `- [${tag.name}](${website}/tags/${tag.slug})`).join('\n');

	return `# ${title}

> ${website}

Xylix thinks aloud here. Topics include but not limited to: Rationality, programming, books, writing and role-playing games.

## Posts

${postLines}

## Tags

${tagLines}
`;
};
