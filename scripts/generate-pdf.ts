#!/usr/bin/env tsx
/**
 * generate-pdf.ts — orchestrator for the mdast → typst → PDF pipeline.
 *
 * Usage:  npm run generate:pdf
 *
 * Produces:
 *   build/posts.typ / build/posts.pdf   — all published posts
 *   build/drafts.typ / build/drafts.pdf — all draft posts
 *
 * Requires the typst CLI for the compilation step (https://typst.app/).
 * If typst is not installed, the .typ files are still written so you can
 * compile manually or install typst later.
 */
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { execSync } from 'child_process';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { stripComments, remarkFlattenThreadBullets } from '../src/lib/remark-plugins.ts';
import { remarkFootnotesTypst } from '../src/lib/remark-footnotes-typst.ts';
import { mdastToTypst } from '../src/lib/mdast-to-typst.ts';
import type { Root } from 'mdast';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PostFrontmatter = {
	title: string;
	tagline?: string;
	tags?: string[];
	draft?: boolean;
	format?: 'thread' | 'article';
	createdAt?: string;
};

type ParsedPost = {
	slug: string;
	fm: PostFrontmatter;
	body: string; // typst string (from mdastToTypst)
	createdAt: Date;
};

type SequenceNode = {
	label: string;
	children: SequenceNode[];
};

type ParsedSequence = {
	slug: string;
	name: string;
	tree: SequenceNode[];
};

// ---------------------------------------------------------------------------
// Minimal frontmatter parser
// Handles the YAML subset used by this project's posts:
//   - simple scalar values (with or without quotes)
//   - flow sequences: ['a', 'b'] or [a, b]
//   - booleans
// ---------------------------------------------------------------------------

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
	const match = raw.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n([\s\S]*)/);
	if (!match) return { data: {}, content: raw };

	const yaml = match[1];
	const content = match[2];
	const data: Record<string, unknown> = {};

	for (const line of yaml.split('\n')) {
		const colonIdx = line.indexOf(':');
		if (colonIdx === -1) continue;
		const key = line.slice(0, colonIdx).trim();
		if (!key || /\s/.test(key)) continue;
		const rawVal = line.slice(colonIdx + 1).trim();

		if (rawVal === 'true') {
			data[key] = true;
		} else if (rawVal === 'false') {
			data[key] = false;
		} else if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
			// Flow sequence: ['a', 'b'] or [a, b]
			data[key] = rawVal
				.slice(1, -1)
				.split(',')
				.map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
				.filter(Boolean);
		} else if (
			(rawVal.startsWith("'") && rawVal.endsWith("'")) ||
			(rawVal.startsWith('"') && rawVal.endsWith('"'))
		) {
			data[key] = rawVal.slice(1, -1);
		} else {
			data[key] = rawVal;
		}
	}

	return { data, content };
}

// ---------------------------------------------------------------------------
// Sequence tree parser (mirrors load_sequences.ts without Vite glob imports)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Sequence link extraction: walk tree, collect nodes whose label is a known slug
// ---------------------------------------------------------------------------

function collectSequenceLinks(
	nodes: SequenceNode[],
	postsBySlug: Map<string, ParsedPost>
): Array<{ slug: string; title: string }> {
	const result: Array<{ slug: string; title: string }> = [];
	for (const node of nodes) {
		if (postsBySlug.has(node.label)) {
			result.push({ slug: node.label, title: postsBySlug.get(node.label)!.fm.title });
		}
		result.push(...collectSequenceLinks(node.children, postsBySlug));
	}
	// Deduplicate while preserving first-occurrence order
	const seen = new Set<string>();
	return result.filter(({ slug }) => {
		if (seen.has(slug)) return false;
		seen.add(slug);
		return true;
	});
}

// ---------------------------------------------------------------------------
// Typst string helpers
// ---------------------------------------------------------------------------

/** Escape for typst markup mode (used in headings and link labels). */
function escMarkup(s: string): string {
	return s
		.replace(/\\/g, '\\\\')
		.replace(/#/g, '\\#')
		.replace(/\$/g, '\\$')
		.replace(/@/g, '\\@')
		.replace(/\*/g, '\\*')
		.replace(/_/g, '\\_');
}

/** Escape for typst string literals ("..."). Only " and \ need escaping. */
function escStr(s: string): string {
	return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// ---------------------------------------------------------------------------
// Process a single post markdown file through the remark → typst pipeline
// ---------------------------------------------------------------------------

async function processPost(filePath: string): Promise<ParsedPost | null> {
	const raw = await readFile(filePath, 'utf8');
	const { data, content } = parseFrontmatter(raw);
	const fm = data as PostFrontmatter;

	if (!fm.title) {
		process.stderr.write(`[generate-pdf] Skipping ${basename(filePath)}: no title\n`);
		return null;
	}

	const stripped = stripComments(content);

	// Duck-typed VFile: only data.fm.format is read by remarkFlattenThreadBullets
	const fileData = { value: stripped, data: { fm } };

	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkFlattenThreadBullets)
		.use(remarkFootnotesTypst);

	const tree = processor.parse(stripped) as Root;
	const transformed = (await processor.run(tree, fileData as never)) as Root;

	// headingOffset: 1 — shift in-body headings to level 2 so they don't
	// conflict with the orchestrator's own level-1 post title heading.
	const body = mdastToTypst(transformed, { headingOffset: 1 });
	const slug = basename(filePath, '.md');
	const createdAt = fm.createdAt ? new Date(fm.createdAt) : new Date(0);

	return { slug, fm, body, createdAt };
}

// ---------------------------------------------------------------------------
// Build the sequences TOC section
// ---------------------------------------------------------------------------

function buildSequencesToc(
	sequences: ParsedSequence[],
	postsBySlug: Map<string, ParsedPost>
): string {
	let result = `= Sequences\n\n`;
	let hasAny = false;

	for (const seq of sequences) {
		const links = collectSequenceLinks(seq.tree, postsBySlug);
		if (links.length === 0) continue;
		hasAny = true;
		result += `== ${escMarkup(seq.name)}\n`;
		for (const { slug, title } of links) {
			result += `- #link(<${slug}>)[${escMarkup(title)}]\n`;
		}
		result += '\n';
	}

	return hasAny ? result : '';
}

// ---------------------------------------------------------------------------
// Build a single post's typst block
// ---------------------------------------------------------------------------

function buildPostBlock(post: ParsedPost, sequenceName?: string): string {
	const label = `<${post.slug}>`;
	const title = escMarkup(post.fm.title);

	const metaArgs: string[] = [];
	if (post.fm.tagline) {
		metaArgs.push(`  tagline: "${escStr(post.fm.tagline)}",`);
	}
	if (post.fm.tags && post.fm.tags.length > 0) {
		const tagsList = post.fm.tags.map((t) => `"${escStr(t)}"`).join(', ');
		metaArgs.push(`  tags: (${tagsList}),`);
	}
	if (sequenceName) {
		metaArgs.push(`  sequence: "${escStr(sequenceName)}",`);
	}

	let block = `= ${title} ${label}\n\n`;
	if (metaArgs.length > 0) {
		block += `#post-meta(\n${metaArgs.join('\n')}\n)\n\n`;
	}
	block += post.body;
	return block;
}

// ---------------------------------------------------------------------------
// Build a complete book (template + sequences TOC + post blocks)
// ---------------------------------------------------------------------------

async function buildBook(
	posts: ParsedPost[],
	sequences: ParsedSequence[],
	template: string
): Promise<string> {
	const postsBySlug = new Map(posts.map((p) => [p.slug, p]));

	// Build slug → sequence name mapping (first occurrence wins)
	const slugToSequence = new Map<string, string>();
	for (const seq of sequences) {
		const walkTree = (nodes: SequenceNode[]) => {
			for (const node of nodes) {
				if (postsBySlug.has(node.label) && !slugToSequence.has(node.label)) {
					slugToSequence.set(node.label, seq.name);
				}
				walkTree(node.children);
			}
		};
		walkTree(seq.tree);
	}

	const sequencesToc = buildSequencesToc(sequences, postsBySlug);

	// Sort posts by createdAt descending (newest first)
	const sorted = [...posts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

	const postBlocks = sorted.map((post) => buildPostBlock(post, slugToSequence.get(post.slug))).join('\n');

	return template + '\n' + sequencesToc + '\n' + postBlocks;
}

// ---------------------------------------------------------------------------
// Compile a .typ file to PDF via the typst CLI
// ---------------------------------------------------------------------------

function compileTypst(typFile: string, pdfFile: string) {
	try {
		execSync(`typst compile "${typFile}" "${pdfFile}"`, { stdio: 'inherit', cwd: REPO_ROOT });
		console.log(`  → ${pdfFile}`);
	} catch (err: unknown) {
		const e = err as NodeJS.ErrnoException & { status?: number };
		// ENOENT: shell itself not found; status 127: typst not on PATH
		if (e.code === 'ENOENT' || e.status === 127) {
			console.warn('\ntypst CLI not found. Install from https://typst.app/');
			console.warn('.typ files have been written; compile manually with:');
			console.warn(`  typst compile "${typFile}" "${pdfFile}"\n`);
		} else {
			throw err;
		}
	}
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
	const buildDir = join(REPO_ROOT, 'build');
	const postsDir = join(REPO_ROOT, 'src/lib/posts');
	const seqDir = join(REPO_ROOT, 'src/lib/sequences');
	const templatePath = join(REPO_ROOT, 'templates/book.typ');

	await mkdir(buildDir, { recursive: true });

	const template = await readFile(templatePath, 'utf8');

	// ----- Load posts -----
	const postFiles = (await readdir(postsDir)).filter((f) => f.endsWith('.md'));
	const allPosts: ParsedPost[] = [];
	for (const file of postFiles) {
		const post = await processPost(join(postsDir, file));
		if (post) allPosts.push(post);
	}
	const publishedPosts = allPosts.filter((p) => !p.fm.draft);
	const draftPosts = allPosts.filter((p) => !!p.fm.draft);
	console.log(
		`Loaded ${allPosts.length} posts (${publishedPosts.length} published, ${draftPosts.length} drafts)`
	);

	// ----- Load sequences -----
	const seqFiles = (await readdir(seqDir)).filter((f) => f.endsWith('.md'));
	const sequences: ParsedSequence[] = [];
	for (const file of seqFiles) {
		const raw = await readFile(join(seqDir, file), 'utf8');
		const { data, content } = parseFrontmatter(raw);
		const name = (data.name as string) || basename(file, '.md');
		const strippedBody = stripComments(content);
		const tree = parseSequenceTree(strippedBody);
		sequences.push({ slug: basename(file, '.md'), name, tree });
	}
	sequences.sort((a, b) => a.name.localeCompare(b.name));
	console.log(`Loaded ${sequences.length} sequences`);

	// ----- Published book -----
	console.log('\nBuilding posts book…');
	const postsTyp = join(buildDir, 'posts.typ');
	const postsPdf = join(buildDir, 'posts.pdf');
	const postsContent = await buildBook(publishedPosts, sequences, template);
	await writeFile(postsTyp, postsContent, 'utf8');
	console.log(`  → ${postsTyp}`);
	compileTypst(postsTyp, postsPdf);

	// ----- Drafts book -----
	console.log('\nBuilding drafts book…');
	const draftsTyp = join(buildDir, 'drafts.typ');
	const draftsPdf = join(buildDir, 'drafts.pdf');
	const draftsContent = await buildBook(draftPosts, sequences, template);
	await writeFile(draftsTyp, draftsContent, 'utf8');
	console.log(`  → ${draftsTyp}`);
	compileTypst(draftsTyp, draftsPdf);

	console.log('\nDone.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
