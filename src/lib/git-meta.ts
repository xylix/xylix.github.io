/**
 * Build-time metadata for .md files, computed by the vite-git-meta plugin.
 * At runtime this just re-exports the virtual module's pre-computed data.
 */

export type GitRevision = {
	/** Commit date (ISO string) */
	date: string;
	/** Lines added in this commit */
	added: number;
	/** Lines deleted in this commit */
	deleted: number;
};

export type GitFileMeta = {
	/** All revisions for this file, newest-first */
	revisions: GitRevision[];
	/** Word count of the file body (after frontmatter) */
	wordCount: number;
};

// The virtual module is populated by the Vite plugin at build/dev time
import data from 'virtual:git-meta';
export const gitMeta: Record<string, GitFileMeta> = data;
