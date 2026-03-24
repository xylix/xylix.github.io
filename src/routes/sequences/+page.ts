import { load_sequences } from '$lib/load_sequences';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const sequences = await load_sequences();

	return {
		posts: sequences.map((seq) => ({
			link: seq.link,
			title: seq.name
		}))
	};
};
