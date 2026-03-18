import type { Article } from './load_posts';

export type Era = {
	name: string;
	start: Date;
	end: Date | null; // null = ongoing
	color: string;
};

export const eras: Era[] = [
	{ name: 'Early', start: new Date('2019-01-01'), end: new Date('2020-01-01'), color: '#fce8d6' },
	{ name: 'Tired', start: new Date('2020-01-01'), end: new Date('2025-06-14'), color: '#c5d4e8' },
	{ name: 'Wired', start: new Date('2025-06-14'), end: null, color: '#d4c5e8' }
];

const FALLBACK_COLOR = 'var(--color-bg-light)';

export function getEraColor(date: Date): string {
	return (
		eras.find((e) => date >= e.start && (e.end === null || date < e.end))?.color ?? FALLBACK_COLOR
	);
}

// Returns a CSS `background` value: solid color, or gradient if eras differ
export function getCardBackground(createdAt: Date, updatedAt?: Date[]): string {
	const originColor = getEraColor(createdAt);
	const latestUpdate = updatedAt?.at(-1);
	const currentColor = latestUpdate ? getEraColor(latestUpdate) : originColor;
	if (originColor === currentColor) return originColor;
	return `linear-gradient(135deg, ${originColor}, ${currentColor})`;
}

export function withEraBackground(posts: Article[]): (Article & { eraBackground: string })[] {
	return posts.map((p) => ({ ...p, eraBackground: getCardBackground(p.createdAt, p.updatedAt) }));
}
