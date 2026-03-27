/// <reference types="node" />

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import type { Plugin } from 'vite';

type GitRevision = {
	date: string;
	added: number;
	deleted: number;
};

type GitFileMeta = {
	revisions: GitRevision[];
	wordCount: number;
};

const MD_DIRS = ['src/lib/posts', 'src/lib/tags', 'src/lib/sequences'];
const VIRTUAL_ID = 'virtual:git-meta';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

function normalizeGitNumstatPath(path: string): string {
	if (!path.includes('=>')) return path;

	const braceRename = path.match(/^(.*)\{([^{}]+) => ([^{}]+)\}(.*)$/);
	if (braceRename) {
		const [, prefix, , renamedTo, suffix] = braceRename;
		return `${prefix}${renamedTo}${suffix}`;
	}

	const splitRename = path.split('\t');
	if (splitRename.length === 2) {
		return splitRename[1];
	}

	const inlineRename = path.match(/^(.*) => (.*)$/);
	if (inlineRename) {
		return inlineRename[2];
	}

	return path;
}

function getGitRevisions(paths: string[]): Map<string, GitRevision[]> {
	const pathArgs = paths.map((p) => `"${p}/"`).join(' ');
	let out: string;
	try {
		out = execSync(`git log --format="COMMIT %aI" --numstat --find-renames -- ${pathArgs}`, {
			encoding: 'utf8'
		});
	} catch {
		return new Map();
	}

	const result = new Map<string, GitRevision[]>();
	let currentDate = '';
	for (const line of out.split('\n')) {
		const trimmed = line.trim();
		if (trimmed.startsWith('COMMIT ')) {
			currentDate = trimmed.slice(7);
		} else if (trimmed && currentDate) {
			const parts = trimmed.split('\t');
			if (parts.length === 3 && parts[2].endsWith('.md')) {
				const filepath = normalizeGitNumstatPath(parts[2]);
				const added = parts[0] === '-' ? 0 : parseInt(parts[0], 10);
				const deleted = parts[1] === '-' ? 0 : parseInt(parts[1], 10);
				if (!result.has(filepath)) result.set(filepath, []);
				result.get(filepath)!.push({ date: currentDate, added, deleted });
			}
		}
	}
	return result;
}

function countWords(fpath: string): number {
	const lines = fs.readFileSync(fpath, 'utf8').split('\n');
	if (lines[0] !== '---') return 0;

	let inFrontMatter = true;
	let count = 0;
	for (const line of lines.slice(1)) {
		if (line === '---' && inFrontMatter) {
			inFrontMatter = false;
			continue;
		}
		if (!inFrontMatter) {
			count += line.split(/\s+/).filter(Boolean).length;
		}
	}
	return count;
}

function buildMeta(): Record<string, GitFileMeta> {
	const revmap = getGitRevisions(MD_DIRS);
	const result: Record<string, GitFileMeta> = {};

	for (const dir of MD_DIRS) {
		if (!fs.existsSync(dir)) continue;
		for (const fname of fs.readdirSync(dir).filter((f: string) => f.endsWith('.md'))) {
			const fpath = `${dir}/${fname}`;
			result[fpath] = {
				revisions: revmap.get(fpath) ?? [],
				wordCount: countWords(fpath)
			};
		}
	}

	return result;
}

export function gitMetaPlugin(): Plugin {
	return {
		name: 'vite-git-meta',
		resolveId(id) {
			if (id === VIRTUAL_ID) return RESOLVED_ID;
		},
		load(id) {
			if (id === RESOLVED_ID) {
				const meta = buildMeta();
				return `export default ${JSON.stringify(meta)};`;
			}
		},
		handleHotUpdate({ file }) {
			if (file.endsWith('.md')) {
				// Invalidate the virtual module when any .md file changes
				return [];
			}
		}
	};
}
