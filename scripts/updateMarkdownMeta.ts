import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const checkMode = process.argv.includes('--check');
const postsFolder = 'src/lib/posts';
const manifestPath = 'wordcounts.json';

function getStagedMdFiles(): string[] {
	const output = execSync("git diff --cached --name-only -- '*.md'", { encoding: 'utf8' });
	return output
		.split('\n')
		.filter((f) => f.endsWith('.md') && fs.existsSync(f));
}

function getChangedMdFiles(): string[] {
	const output = execSync("git diff --name-only HEAD -- '*.md'", { encoding: 'utf8' });
	return output
		.split('\n')
		.filter((f) => f.endsWith('.md') && fs.existsSync(f));
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
		`T${pad(now.getHours())}:${pad(now.getMinutes())}:00` +
		`${sign}${hours}${minutes}`
	);
}

function countWords(fpath: string): number {
	const lines = fs.readFileSync(fpath, 'utf8').split('\n');
	if (lines[0] !== '---') return 0;

	let inFrontMatter = true;
	let wordCount = 0;
	for (const line of lines.slice(1)) {
		if (line === '---' && inFrontMatter) {
			inFrontMatter = false;
			continue;
		}
		if (!inFrontMatter) {
			wordCount += line.split(/\s+/).filter(Boolean).length;
		}
	}
	return wordCount;
}

function updateTimestamp(fpath: string): boolean {
	const content = fs.readFileSync(fpath, 'utf8');
	const lines = content.split('\n');
	if (lines[0] !== '---') return false;

	let frontMatterEnd = -1;
	for (let i = 1; i < lines.length; i++) {
		if (lines[i] === '---') {
			frontMatterEnd = i;
			break;
		}
	}
	if (frontMatterEnd === -1) return false;

	const ts = formatTimestamp();
	for (let i = 1; i < frontMatterEnd; i++) {
		if (lines[i].startsWith('updatedAt')) {
			const newLine = `updatedAt: '${ts}'`;
			if (lines[i] !== newLine) {
				lines[i] = newLine;
				fs.writeFileSync(fpath, lines.join('\n'));
				return true;
			}
			return false;
		}
	}
	return false;
}

function updateWordCounts(): boolean {
	if (!fs.existsSync(postsFolder)) return false;

	const posts = fs.readdirSync(postsFolder).filter((f) => f.endsWith('.md'));
	const manifest: Record<string, number> = {};

	for (const fname of posts) {
		const slug = fname.replace(/\.md$/, '');
		manifest[slug] = countWords(path.join(postsFolder, fname));
	}

	const newContent = `${JSON.stringify(manifest, null, '\t')}\n`;
	const oldContent = fs.existsSync(manifestPath) ? fs.readFileSync(manifestPath, 'utf8') : '';

	if (newContent === oldContent) return false;

	fs.writeFileSync(manifestPath, newContent);
	return true;
}

function main() {
	const changedFiles: string[] = [];

	// Always update all word counts
	const wcChanged = updateWordCounts();
	if (wcChanged) changedFiles.push(manifestPath);

	// Update timestamps only for changed .md files
	const mdFiles = checkMode ? getStagedMdFiles() : getChangedMdFiles();
	for (const fpath of mdFiles) {
		if (updateTimestamp(fpath)) changedFiles.push(fpath);
	}

	if (checkMode && changedFiles.length > 0) {
		const fileList = changedFiles.join(' ');
		console.error(
			`Markdown metadata is out of date in: ${changedFiles.join(', ')}\n` +
				`Run: git add ${fileList}`
		);
		process.exit(1);
	}
}

main();
