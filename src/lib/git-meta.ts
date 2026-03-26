/**
 * Build-time metadata for .md files, computed by the vite-git-meta plugin.
 * At runtime this just re-exports the virtual module's pre-computed data.
 */

export type GitFileMeta = {
	/** All commit dates for this file, newest-first (ISO strings) */
	dates: string[];
	/** Word count of the file body (after frontmatter) */
	wordCount: number;
};

// The virtual module is populated by the Vite plugin at build/dev time
import data from 'virtual:git-meta';
export const gitMeta: Record<string, GitFileMeta> = data;
