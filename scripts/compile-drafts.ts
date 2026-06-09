import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import yaml from 'js-yaml';

type PostMeta = {
	title?: string;
	tagline?: string;
	tags?: string[];
	draft?: boolean;
};

type DraftPost = {
	filePath: string;
	slug: string;
	frontmatter: string;
	meta: PostMeta;
	body: string;
};

const postsDir = path.join(process.cwd(), 'src/lib/posts');
const outputPath = path.resolve(process.cwd(), process.argv[2] ?? 'drafts-compiled.md');

function splitFrontmatter(raw: string): { frontmatter: string; meta: PostMeta; body: string } | null {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) return null;

	const [, frontmatter, body] = match;
	const meta = (yaml.load(frontmatter) as PostMeta | undefined) ?? {};
	return { frontmatter, meta, body };
}

function formatTags(tags?: string[]): string {
	if (!tags || tags.length === 0) return '[]';
	return `[${tags.map((tag) => JSON.stringify(tag)).join(', ')}]`;
}

function formatDraftPost(post: DraftPost): string {
	const title = post.meta.title ?? post.slug;
	const tagline = post.meta.tagline ? `\ntagline: ${post.meta.tagline}` : '';

	return [
		`<!-- BEGIN DRAFT POST: ${post.filePath} -->`,
		`# ${title}`,
		'',
		`file: ${post.filePath}`,
		`slug: ${post.slug}`,
		`tags: ${formatTags(post.meta.tags)}`,
		`draft: ${post.meta.draft === true}`,
		`${tagline}`,
		'',
		'```yaml',
		post.frontmatter.trim(),
		'```',
		'',
		post.body.trim(),
		'',
		`<!-- END DRAFT POST: ${post.filePath} -->`
	]
		.filter((part) => part !== undefined)
		.join('\n');
}

async function loadDraftPosts(): Promise<DraftPost[]> {
	const filenames = (await readdir(postsDir)).filter((file) => file.endsWith('.md')).sort();
	const posts = await Promise.all(
		filenames.map(async (filename) => {
			const absolutePath = path.join(postsDir, filename);
			const raw = await readFile(absolutePath, 'utf8');
			const parsed = splitFrontmatter(raw);
			if (!parsed || parsed.meta.draft !== true) return null;

			return {
				filePath: path.relative(process.cwd(), absolutePath),
				slug: filename.replace(/\.md$/, ''),
				frontmatter: parsed.frontmatter,
				meta: parsed.meta,
				body: parsed.body
			} satisfies DraftPost;
		})
	);

	return posts.filter((post): post is DraftPost => post !== null);
}

async function main() {
	const drafts = await loadDraftPosts();
	const generatedAt = new Date().toISOString();
	const tableOfContents = drafts
		.map((post) => `- ${post.meta.title ?? post.slug} (${post.filePath})`)
		.join('\n');

	const output = [
		'# Draft Posts Bundle',
		'',
		`Generated: ${generatedAt}`,
		`Source: src/lib/posts/*.md with \`draft: true\``,
		`Count: ${drafts.length}`,
		'',
		'## Table of Contents',
		'',
		tableOfContents,
		'',
		'---',
		'',
		drafts.map(formatDraftPost).join('\n\n---\n\n'),
		''
	].join('\n');

	await mkdir(path.dirname(outputPath), { recursive: true });
	await writeFile(outputPath, output, 'utf8');

	console.log(`Wrote ${drafts.length} draft posts to ${path.relative(process.cwd(), outputPath)}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
