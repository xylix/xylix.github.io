declare module 'virtual:git-meta' {
	const data: Record<string, { dates: string[]; wordCount: number }>;
	export default data;
}
