import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import type { Root } from 'mdast';
import yaml from 'js-yaml';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { VFile } from 'vfile';
import { mdastToTypst } from '../src/lib/pdf/mdast-to-typst.ts';
import { remarkFlattenThreadBullets, stripComments } from '../src/lib/remark-plugins.ts';
import { remarkFootnotesTypst } from '../src/lib/pdf/remark-footnotes-typst.ts';

type PostMeta = {
	title: string;
	name?: string;
	tagline?: string;
	tags?: string[];
	draft?: boolean;
	format?: 'thread' | 'article';
	createdAt?: string;
};

type ParsedPost = {
	slug: string;
	meta: Required<Pick<PostMeta, 'title'>> & PostMeta;
	body: string;
	publishedAt: string;
	updatedAt: string;
};

type SequenceArticle = {
	slug: string;
	name: string;
	tagline?: string;
	tree: SequenceNode[];
	body: string;
};

type BuildMetadata = {
	buildTimestamp: string;
	gitCommitFull: string;
	gitCommitShort: string;
	gitCommitDate: string;
	gitCommitSubject: string;
	worktreeNote: string;
};

type SequenceNode = {
	label: string;
	children: SequenceNode[];
};

type GitRevision = {
	date: string;
	added: number;
	deleted: number;
};

function splitFrontmatter(raw: string): { data: PostMeta; content: string } {
	if (!raw.startsWith('---\n')) return { data: { title: '' }, content: raw };
	const end = raw.indexOf('\n---\n', 4);
	if (end === -1) return { data: { title: '' }, content: raw };

	const frontmatter = raw.slice(4, end);
	const content = raw.slice(end + 5);
	const data = (yaml.load(frontmatter) as PostMeta | undefined) ?? { title: '' };
	return { data, content };
}

function cleanupMdsvex(raw: string): string {
	return raw
		.replace(/<script[\s\S]*?<\/script>\s*/g, '')
		.replace(
			/<PdfViewer\s+src="([^"]+)"(?:\s+title="([^"]+)")?\s*\/>/g,
			(_match, src: string, title?: string) =>
				`${title ?? 'Slides'}: [PDF](${src})`
		);
}

function parseSequenceTree(body: string): SequenceNode[] {
	const lines = body
		.split('\n')
		.filter((line) => /^\s*[*-]\s/.test(line))
		.map((line) => {
			const match = line.match(/^(\s*)[*-]\s+(.*)/);
			return { indent: match![1].length, label: match![2].trim() };
		});

	if (lines.length === 0) return [];

	function build(start: number, parentIndent: number): [SequenceNode[], number] {
		const nodes: SequenceNode[] = [];
		let i = start;
		while (i < lines.length && lines[i].indent > parentIndent) {
			const node: SequenceNode = { label: lines[i].label, children: [] };
			const currentIndent = lines[i].indent;
			i++;
			if (i < lines.length && lines[i].indent > currentIndent) {
				const [children, next] = build(i, currentIndent);
				node.children = children;
				i = next;
			}
			nodes.push(node);
		}
		return [nodes, i];
	}

	const [tree] = build(0, -1);
	return tree;
}

function typstString(value: string): string {
	return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function typstArgs(values: string[]): string {
	if (values.length === 1) {
		return `${typstString(values[0])},`;
	}
	return values.map((value) => typstString(value)).join(', ');
}

function normalizeGitNumstatPath(filePath: string): string {
	if (!filePath.includes('=>')) return filePath;

	const braceRename = filePath.match(/^(.*)\{([^{}]+) => ([^{}]+)\}(.*)$/);
	if (braceRename) {
		const [, prefix, , renamedTo, suffix] = braceRename;
		return `${prefix}${renamedTo}${suffix}`;
	}

	const splitRename = filePath.split('\t');
	if (splitRename.length === 2) {
		return splitRename[1];
	}

	const inlineRename = filePath.match(/^(.*) => (.*)$/);
	if (inlineRename) {
		return inlineRename[2];
	}

	return filePath;
}

function getGitRevisions(paths: string[]): Map<string, GitRevision[]> {
	let out = '';
	try {
		out = execFileSync(
			'git',
			['log', '--format=COMMIT %aI', '--numstat', '--find-renames', '--', ...paths.map((p) => `${p}/`)],
			{
				cwd: process.cwd(),
				encoding: 'utf8'
			}
		);
	} catch {
		return new Map();
	}

	const result = new Map<string, GitRevision[]>();
	let currentDate = '';
	for (const line of out.split('\n')) {
		const trimmed = line.trim();
		if (trimmed.startsWith('COMMIT ')) {
			currentDate = trimmed.slice(7);
			continue;
		}
		if (!trimmed || !currentDate) continue;

		const parts = trimmed.split('\t');
		if (parts.length !== 3 || !parts[2].endsWith('.md')) continue;
		const filepath = normalizeGitNumstatPath(parts[2]);
		const added = parts[0] === '-' ? 0 : parseInt(parts[0], 10);
		const deleted = parts[1] === '-' ? 0 : parseInt(parts[1], 10);
		if (!result.has(filepath)) result.set(filepath, []);
		result.get(filepath)!.push({ date: currentDate, added, deleted });
	}

	return result;
}

function formatTimestamp(value: string): string {
	return new Date(value).toISOString();
}

async function parseMarkdownToTypst(
	fullPath: string,
	content: string,
	frontmatter: PostMeta,
	options?: { headingOffset?: number }
): Promise<string> {
	const cleaned = cleanupMdsvex(stripComments(content));
	const file = new VFile({ path: fullPath, value: cleaned, data: { fm: frontmatter } });
	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkFlattenThreadBullets)
		.use(remarkFootnotesTypst);
	const tree = processor.parse(file);
	const transformed = (await processor.run(tree, file)) as Root;
	return mdastToTypst(transformed, { headingOffset: options?.headingOffset ?? 0 });
}

async function parsePost(
	postsDir: string,
	filename: string,
	gitMeta: Map<string, GitRevision[]>
): Promise<ParsedPost> {
	const fullPath = path.join(postsDir, filename);
	const repoPath = path.posix.join('src/lib/posts', filename);
	const raw = await readFile(fullPath, 'utf8');
	const { data, content } = splitFrontmatter(raw);
	const slug = filename.replace(/\.md$/, '');
	const revisions = gitMeta.get(repoPath) ?? [];
	const publishedAt = data.createdAt
		? formatTimestamp(data.createdAt)
		: revisions.length > 0
			? formatTimestamp(revisions.at(-1)!.date)
			: formatTimestamp(new Date().toISOString());
	const updatedAt =
		revisions.length > 0 ? formatTimestamp(revisions[0].date) : publishedAt;

	return {
		slug,
		meta: {
			...data,
			title: data.title || slug,
			tags: data.tags ?? []
		},
		body: await parseMarkdownToTypst(fullPath, content, data, { headingOffset: 1 }),
		publishedAt,
		updatedAt
	};
}

function collectSequenceLeafSlugs(nodes: SequenceNode[]): string[] {
	const slugs: string[] = [];

	for (const node of nodes) {
		if (node.children.length === 0) {
			slugs.push(...node.label.split(/\s*\/\s*/).map((slug) => slug.trim()).filter(Boolean));
			continue;
		}
		slugs.push(...collectSequenceLeafSlugs(node.children));
	}

	return slugs;
}

function escapeTypstContent(value: string): string {
	return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function escapeTypstText(value: string): string {
	return value
		.replace(/\\/g, '\\\\')
		.replace(/([#$@<>\[\]*_`()~])/g, '\\$1')
		.replace(/(^|\n)([=+\-/*])/g, '$1\\$2');
}

function renderPostBlock(post: ParsedPost, sequences: string[]): string {
	const title = escapeTypstText(post.meta.title);
	const tagline = post.meta.tagline ? typstString(post.meta.tagline) : 'none';
	const tags = `(${typstArgs(post.meta.tags ?? [])})`;
	const sequence = sequences.length > 0 ? typstString(sequences.join(', ')) : 'none';
	const published = typstString(post.publishedAt);
	const updated = typstString(post.updatedAt);

	return `= ${title} <${post.slug}>

#post-meta(
  tagline: ${tagline},
  tags: ${tags},
  sequence: ${sequence},
  published: ${published},
  updated: ${updated},
)

${post.body}`;
}

function renderSequenceTree(
	nodes: SequenceNode[],
	postTitleBySlug: Map<string, string>,
	availableSlugs: Set<string>,
	depth = 0
): string[] {
	const indent = '  '.repeat(depth);
	const lines: string[] = [];

	for (const node of nodes) {
		if (node.children.length === 0) {
			const slugs = node.label.split(/\s*\/\s*/).map((slug) => slug.trim()).filter(Boolean);
			for (const slug of slugs) {
				if (!availableSlugs.has(slug)) continue;
				lines.push(`${indent}- #link(<${slug}>)[${postTitleBySlug.get(slug) ?? slug}]`);
			}
			continue;
		}

		const childLines = renderSequenceTree(node.children, postTitleBySlug, availableSlugs, depth + 1);
		if (childLines.length === 0) continue;
		lines.push(`${indent}- ${escapeTypstText(node.label)}`);
		lines.push(...childLines);
	}

	return lines;
}

function renderSequenceOutline(
	posts: ParsedPost[],
	sequences: SequenceArticle[],
	postTitleBySlug: Map<string, string>
): string {
	const available = new Set(posts.map((post) => post.slug));
	const sections = sequences
		.map((sequence) => {
			const lines = renderSequenceTree(sequence.tree, postTitleBySlug, available);
			if (lines.length === 0) return '';
			return `== #link(<sequence-${sequence.slug}>)[${escapeTypstText(sequence.name)}]\n${lines.join('\n')}`;
		})
		.filter(Boolean);

	if (sections.length === 0) return '';
	return `= Sequences\n\n${sections.join('\n\n')}\n`;
}

async function buildSequences(sequencesDir: string): Promise<SequenceArticle[]> {
	const filenames = (await readdir(sequencesDir)).filter((file) => file.endsWith('.md'));
	const sequences = await Promise.all(
		filenames.map(async (filename) => {
			const fullPath = path.join(sequencesDir, filename);
			const raw = await readFile(fullPath, 'utf8');
			const { data, content } = splitFrontmatter(raw);
			const slug = filename.replace(/\.md$/, '');
			const tree = parseSequenceTree(stripComments(content));
			return {
				slug,
				name: data.name || filename.replace(/\.md$/, ''),
				tagline: data.tagline,
				tree,
				body: await parseMarkdownToTypst(fullPath, content, data, { headingOffset: 1 })
			};
		})
	);

	return sequences.sort((a, b) => a.name.localeCompare(b.name));
}

function renderSequencePage(sequence: SequenceArticle): string {
	const tagline = sequence.tagline ? `\n\n_${escapeTypstText(sequence.tagline)}_` : '';
	return `= ${escapeTypstText(sequence.name)} <sequence-${sequence.slug}>${tagline}

${sequence.body}`;
}

function renderBook(
	template: string,
	bookTitle: string,
	subtitle: string,
	posts: ParsedPost[],
	sequences: SequenceArticle[],
	buildMetadata: BuildMetadata
): string {
	const postTitleBySlug = new Map(posts.map((post) => [post.slug, post.meta.title]));
	const sequenceNamesBySlug = new Map<string, string[]>();

	for (const sequence of sequences) {
		for (const slug of collectSequenceLeafSlugs(sequence.tree)) {
			if (!postTitleBySlug.has(slug)) continue;
			const existing = sequenceNamesBySlug.get(slug) ?? [];
			existing.push(sequence.name);
			sequenceNamesBySlug.set(slug, existing);
		}
	}

	const header = template
		.replaceAll('{{BOOK_TITLE}}', escapeTypstContent(bookTitle))
		.replaceAll('{{BOOK_SUBTITLE}}', escapeTypstContent(subtitle))
		.replaceAll('{{BUILD_TIMESTAMP}}', escapeTypstContent(buildMetadata.buildTimestamp))
		.replaceAll('{{GIT_COMMIT_SHORT}}', escapeTypstContent(buildMetadata.gitCommitShort))
		.replaceAll('{{GIT_COMMIT_FULL}}', escapeTypstContent(buildMetadata.gitCommitFull))
		.replaceAll('{{GIT_COMMIT_DATE}}', escapeTypstContent(buildMetadata.gitCommitDate))
		.replaceAll('{{GIT_COMMIT_SUBJECT}}', escapeTypstContent(buildMetadata.gitCommitSubject))
		.replaceAll('{{WORKTREE_NOTE}}', escapeTypstContent(buildMetadata.worktreeNote));

	const sequenceOutline = renderSequenceOutline(posts, sequences, postTitleBySlug);
	const sequencePages = sequences
		.filter((sequence) =>
			collectSequenceLeafSlugs(sequence.tree).some((slug) => postTitleBySlug.has(slug))
		)
		.map((sequence) => renderSequencePage(sequence));
	const postBlocks = posts.map((post) => renderPostBlock(post, sequenceNamesBySlug.get(post.slug) ?? []));

	return [header, sequenceOutline, ...sequencePages, ...postBlocks].filter(Boolean).join('\n\n');
}

function sortPosts(posts: ParsedPost[]): ParsedPost[] {
	return [...posts].sort((a, b) => {
		const aTime = a.meta.createdAt ? new Date(a.meta.createdAt).getTime() : 0;
		const bTime = b.meta.createdAt ? new Date(b.meta.createdAt).getTime() : 0;
		return bTime - aTime;
	});
}

function compileTypst(inputPath: string, outputPath: string) {
	execFileSync('typst', ['compile', '--root', process.cwd(), inputPath, outputPath], {
		stdio: 'inherit',
		cwd: process.cwd()
	});
}

function getBuildMetadata(): BuildMetadata {
	const commitFull = execFileSync('git', ['rev-parse', 'HEAD'], {
		cwd: process.cwd(),
		encoding: 'utf8'
	}).trim();
	const [gitCommitFull, gitCommitShort, gitCommitDate, ...subjectParts] = execFileSync(
		'git',
		['log', '-1', '--format=%H%n%h%n%cI%n%s'],
		{
			cwd: process.cwd(),
			encoding: 'utf8'
		}
	)
		.trim()
		.split('\n');
	const dirty = execFileSync('git', ['status', '--porcelain'], {
		cwd: process.cwd(),
		encoding: 'utf8'
	}).trim();

	return {
		buildTimestamp: new Date().toISOString(),
		gitCommitFull: gitCommitFull || commitFull,
		gitCommitShort: gitCommitShort || commitFull.slice(0, 7),
		gitCommitDate,
		gitCommitSubject: subjectParts.join('\n'),
		worktreeNote:
			dirty.length > 0
				? 'Build note: uncommitted changes were present in the working tree at build time.'
				: 'Build note: working tree was clean at build time.'
	};
}

async function main() {
	const skipCompile = process.argv.includes('--skip-compile');
	const repoRoot = process.cwd();
	const postsDir = path.join(repoRoot, 'src/lib/posts');
	const sequencesDir = path.join(repoRoot, 'src/lib/sequences');
	const buildDir = path.join(repoRoot, 'build');
	const templatePath = path.join(repoRoot, 'templates/book.typ');
	await mkdir(buildDir, { recursive: true });

	const gitRevisions = getGitRevisions(['src/lib/posts', 'src/lib/sequences']);
	const filenames = (await readdir(postsDir)).filter((file) => file.endsWith('.md'));
	const posts = await Promise.all(
		filenames.map((filename) => parsePost(postsDir, filename, gitRevisions))
	);
	const sequences = await buildSequences(sequencesDir);
	const template = await readFile(templatePath, 'utf8');
	const buildMetadata = getBuildMetadata();

	const published = sortPosts(posts.filter((post) => !post.meta.draft));
	const drafts = sortPosts(posts.filter((post) => !!post.meta.draft));

	const books = [
		{
			title: 'Collected Posts',
			subtitle: 'Published posts',
			posts: published,
			typPath: path.join(buildDir, 'posts.typ'),
			pdfPath: path.join(buildDir, 'posts.pdf')
		},
		{
			title: 'Collected Drafts',
			subtitle: 'Draft posts',
			posts: drafts,
			typPath: path.join(buildDir, 'drafts.typ'),
			pdfPath: path.join(buildDir, 'drafts.pdf')
		}
	];

	for (const book of books) {
		const typst = renderBook(
			template,
			book.title,
			book.subtitle,
			book.posts,
			sequences,
			buildMetadata
		);
		await writeFile(book.typPath, typst, 'utf8');
		if (!skipCompile) {
			compileTypst(book.typPath, book.pdfPath);
		}
	}
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
