export type Era = {
	name: string;
	start: Date;
	end: Date | null; // null = ongoing
	color: string;
};

export const eras: Era[] = [
	{ name: 'Early', start: new Date('2019-01-01'), end: new Date('2022-01-01'), color: '#d4c5e8' },
	{ name: 'Middle', start: new Date('2022-01-01'), end: new Date('2024-01-01'), color: '#c5d4e8' },
	{ name: 'Recent', start: new Date('2024-01-01'), end: null, color: '#fce8d6' }
];

const FALLBACK_COLOR = '#fce8d6'; // matches existing --color-bg-light

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
