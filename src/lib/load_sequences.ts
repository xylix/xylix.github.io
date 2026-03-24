import type { SvelteComponent } from 'svelte';

export type SequenceSection = {
	section: string;
	posts: string[];
};

type RawSequence = {
	default: typeof SvelteComponent;
	metadata: MetaSequence;
};

export type MetaSequence = {
	name: string;
	tagline?: string;
	updatedAt: string;
	/** Either a flat list of post slugs, or an array of named sections each with post slugs */
	content: string[] | SequenceSection[];
};

export type SequenceArticle = {
	link: string;
	slug: string;
	name: string;
	tagline?: string;
	updatedAt: Date;
	sections: SequenceSection[];
	content: typeof SvelteComponent;
};

function normalizeContent(content: string[] | SequenceSection[]): SequenceSection[] {
	if (!content || content.length === 0) return [];
	if (typeof content[0] === 'string') {
		return [{ section: '', posts: content as string[] }];
	}
	return content as SequenceSection[];
}

const load_sequences = async (): Promise<SequenceArticle[]> => {
	const raw = import.meta.glob(`./sequences/*.md`, { eager: true });

	const sequences = Object.entries(raw)
		.map(([path, untypedSeq]) => {
			const seq = untypedSeq as RawSequence;

			if (!seq.metadata) {
				throw new Error(`Missing metadata in ${path}. Needs to have name, updatedAt, content`);
			}
			const { name, tagline, updatedAt, content } = seq.metadata;

			const requiredMetadata = [name, updatedAt, content].every((val) => val !== undefined);
			if (!requiredMetadata) {
				throw new Error(
					`Missing metadata in ${path}. Metadata present: ${Object.keys(seq.metadata)}`
				);
			}

			const fname = path.replace(/^.*[\\/]/, '');
			const slug = fname.replace(/\.md$/, '');

			return {
				link: `/sequences/${slug}`,
				slug,
				name,
				tagline,
				updatedAt: new Date(updatedAt),
				sections: normalizeContent(content),
				content: seq.default
			};
		})
		.sort((a, b) => a.name.localeCompare(b.name));

	return sequences;
};

export const public_sequences = await load_sequences();
