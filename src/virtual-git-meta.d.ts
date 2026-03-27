declare module 'virtual:git-meta' {
	const data: Record<string, { revisions: { date: string; added: number; deleted: number }[]; wordCount: number }>;
	export default data;
}
