import fs from 'fs';
import { execSync } from 'child_process';

const checkMode = process.argv.includes('--check');

function getStagedMdFiles(): string[] {
	const output = execSync("git diff --cached --name-only -- '*.md'", { encoding: 'utf8' });
	return output
		.split('\n')
		.filter((f) => f.endsWith('.md') && fs.existsSync(f));
}

function getAllPostFiles(): string[] {
	const postsFolder = 'src/lib/posts';
	if (!fs.existsSync(postsFolder)) return [];
	return fs.readdirSync(postsFolder).filter((f) => f.endsWith('.md')).map((f) => `${postsFolder}/${f}`);
}

function formatTimestamp(): string {
	const now = new Date();
	const offset = -now.getTimezoneOffset();
	const sign = offset >= 0 ? '+' : '-';
	const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
	const minutes = String(Math.abs(offset) % 60).padStart(2, '0');
	const pad = (n: number) => String(n).padStart(2, '0');

	return (
		`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
		`T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` +
		`${sign}${hours}${minutes}`
	);
}

function updateFile(fpath: string, updateTimestamp: boolean): boolean {
	const content = fs.readFileSync(fpath, 'utf8');
	const lines = content.split('\n');

	if (lines[0] !== '---') return false;

	let inFrontMatter = true;
	let hasWordCount = false;
	let hasUpdatedAt = false;
	let wordCount = 0;
	let frontMatterEnd = -1;

	for (let i = 1; i < lines.length; i++) {
		if (lines[i] === '---' && inFrontMatter) {
			frontMatterEnd = i;
			inFrontMatter = false;
			continue;
		}
		if (inFrontMatter) {
			if (lines[i].startsWith('wordCount')) hasWordCount = true;
			if (lines[i].startsWith('updatedAt')) hasUpdatedAt = true;
		} else {
			wordCount += lines[i].split(/\s+/).filter(Boolean).length;
		}
	}

	if (frontMatterEnd === -1) return false;

	let changed = false;

	if (hasWordCount) {
		for (let i = 1; i < frontMatterEnd; i++) {
			if (lines[i].startsWith('wordCount')) {
				const newLine = `wordCount: ${wordCount}`;
				if (lines[i] !== newLine) {
					lines[i] = newLine;
					changed = true;
				}
				break;
			}
		}
	}

	if (hasUpdatedAt && updateTimestamp) {
		const ts = formatTimestamp();
		for (let i = 1; i < frontMatterEnd; i++) {
			if (lines[i].startsWith('updatedAt')) {
				const newLine = `updatedAt: '${ts}'`;
				if (lines[i] !== newLine) {
					lines[i] = newLine;
					changed = true;
				}
				break;
			}
		}
	}

	if (!changed) return false;

	fs.writeFileSync(fpath, lines.join('\n'));
	return true;
}

function main() {
	const files = checkMode ? getStagedMdFiles() : getAllPostFiles();
	const changedFiles: string[] = [];

	for (const fpath of files) {
		const changed = updateFile(fpath, checkMode);
		if (changed) changedFiles.push(fpath);
	}

	if (checkMode && changedFiles.length > 0) {
		const fileList = changedFiles.join(' ');
		console.error(
			`Markdown metadata (wordCount/updatedAt) is out of date in: ${changedFiles.join(', ')}\n` +
				`Run: git add ${fileList}`
		);
		process.exit(1);
	}
}

main();
