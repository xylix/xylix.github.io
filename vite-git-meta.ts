import { execSync } from 'child_process';
import fs from 'fs';
import type { Plugin } from 'vite';

type GitFileMeta = {
	dates: string[];
	wordCount: number;
};

const MD_DIRS = ['src/lib/posts', 'src/lib/tags', 'src/lib/sequences'];
const VIRTUAL_ID = 'virtual:git-meta';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

function getGitDates(paths: string[]): Map<string, string[]> {
	const pathArgs = paths.map((p) => `"${p}/"`).join(' ');
	let out: string;
	try {
		out = execSync(`git log --format="COMMIT %aI" --name-only -z -- ${pathArgs}`, {
			encoding: 'utf8',
		});
	} catch {
		return new Map();
	}

	const result = new Map<string, string[]>();
	let currentDate = '';
	for (const chunk of out.split('\0')) {
		const trimmed = chunk.trim();
		if (trimmed.startsWith('COMMIT ')) {
			currentDate = trimmed.slice(7);
		} else if (trimmed.endsWith('.md') && currentDate) {
			if (!result.has(trimmed)) result.set(trimmed, []);
			result.get(trimmed)!.push(currentDate);
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
	const datemap = getGitDates(MD_DIRS);
	const result: Record<string, GitFileMeta> = {};

	for (const dir of MD_DIRS) {
		if (!fs.existsSync(dir)) continue;
		for (const fname of fs.readdirSync(dir).filter((f: string) => f.endsWith('.md'))) {
			const fpath = `${dir}/${fname}`;
			result[fpath] = {
				dates: datemap.get(fpath) ?? [],
				wordCount: countWords(fpath),
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
		},
	};
}
