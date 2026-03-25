import type { SvelteComponent } from 'svelte';

export type SequenceNode = {
	label: string;
	children: SequenceNode[];
};

export type SequenceArticle = {
	link: string;
	slug: string;
	name: string;
	tagline?: string;
	updatedAt: Date;
	tree: SequenceNode[];
	content: typeof SvelteComponent;
	hasProse: boolean;
};

type MetaSequence = {
	name: string;
	tagline?: string;
	updatedAt: string;
};

function parseSequenceTree(rawMarkdown: string): SequenceNode[] {
	const body = rawMarkdown.replace(/^---[\s\S]*?---/, '').trim();
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

function stripComments(raw: string): string {
	return raw
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/^(TODO|FIXME|NOTE):.*$/gm, '');
}

function hasSequenceProse(rawMarkdown: string): boolean {
	const body = rawMarkdown.replace(/^---[\s\S]*?---/, '').trim();
	return body.split('\n').some((line) => line.trim() && !/^\s*[*-]\s/.test(line));
}

const load_sequences = async (): Promise<SequenceArticle[]> => {
	const rawFiles = import.meta.glob(`./sequences/*.md`, { eager: true, query: '?raw', import: 'default' });
	const metaFiles = import.meta.glob(`./sequences/*.md`, { eager: true });

	const sequences = Object.entries(metaFiles)
		.map(([path, mod]) => {
			const { metadata, default: content } = mod as { metadata: MetaSequence; default: typeof SvelteComponent };
			if (!metadata?.name || !metadata?.updatedAt) {
				throw new Error(
					`Missing metadata in ${path}. Metadata present: ${Object.keys(metadata ?? {})}`
				);
			}

			const raw = stripComments(rawFiles[path] as string);
			const tree = parseSequenceTree(raw);
			const hasProse = hasSequenceProse(raw);

			const fname = path.replace(/^.*[\\/]/, '');
			const slug = fname.replace(/\.md$/, '');

			return {
				link: `/sequences/${slug}`,
				slug,
				name: metadata.name,
				tagline: metadata.tagline,
				updatedAt: new Date(metadata.updatedAt),
				tree,
				content,
				hasProse
			};
		})
		.sort((a, b) => a.name.localeCompare(b.name));

	return sequences;
};

export const public_sequences = await load_sequences();
