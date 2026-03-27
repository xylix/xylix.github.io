export type VibeItem = {
	id: string;
	type: 'text' | 'image';
	content: string;
	/** percentage 0–100 from left */
	x: number;
	/** percentage 0–100 from top */
	y: number;
	rotate?: number;
	fontSize?: string;
	color?: string;
	mono?: boolean;
	/** for type: 'image' */
	alt?: string;
};

export const vibes: VibeItem[] = [
	{
		id: 'domesticated',
		type: 'text',
		content: 'i will not be domesticated',
		x: 2,
		y: 5,
		rotate: -1.5,
		fontSize: '1rem',
		color: 'var(--color-text)',
	},
	{
		id: 'ouroboros-phoenix',
		type: 'text',
		content: 'ouroboros → phoenix',
		x: 50,
		y: 12,
		rotate: -2,
		fontSize: '1.1rem',
		color: 'var(--color-theme-2)',
	},
	{
		id: 'compliance',
		type: 'text',
		content: 'compliance\n(and noncompliance\nand asking for forgiveness\nnot permission)',
		x: 8,
		y: 50,
		rotate: 1.5,
		fontSize: '0.75rem',
		color: 'var(--color-text-muted)',
		mono: true,
	},
	{
		id: 'blogging-and',
		type: 'text',
		content: 'blogging and',
		x: 60,
		y: 72,
		rotate: 3,
		fontSize: '0.9rem',
		color: 'var(--color-theme-1)',
		mono: true,
	},
];
