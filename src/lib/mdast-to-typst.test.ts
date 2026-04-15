/**
 * Unit tests for the mdast → typst serialiser and the typst footnote plugin.
 * Uses the unified + remark-parse pipeline directly (not mdsvex) since we're
 * testing the typst path, not the Svelte path.
 */
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { describe, it, expect } from 'vitest';
import { mdastToTypst } from './mdast-to-typst.js';
import { remarkFootnotesTypst } from './remark-footnotes-typst.js';
import type { Root } from 'mdast';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toTypst(md: string, opts?: { format?: 'thread' | 'article'; headingOffset?: number }): string {
	const fileData = { value: md, data: { fm: { format: opts?.format ?? 'article' } } };
	// remark-gfm is required so [^id] footnotes are parsed as footnoteReference /
	// footnoteDefinition nodes (remark-parse v11 alone renders them as plain text).
	const processor = unified().use(remarkParse).use(remarkGfm).use(remarkFootnotesTypst);
	const tree = processor.parse(fileData.value) as Root;
	// Pass duck-typed fileData so remarkFlattenThreadBullets can read data.fm.format
	const transformed = processor.runSync(tree, fileData as never) as Root;
	return mdastToTypst(transformed, { headingOffset: opts?.headingOffset });
}

// ---------------------------------------------------------------------------
// Character escaping
// ---------------------------------------------------------------------------

describe('character escaping', () => {
	it('escapes # in text', () => {
		expect(toTypst('Price #2')).toContain('\\#2');
	});

	it('escapes $ in text', () => {
		expect(toTypst('Cost $5')).toContain('\\$5');
	});

	it('escapes @ in text', () => {
		expect(toTypst('Email: foo@bar')).toContain('foo\\@bar');
	});

	it('escapes * in text to avoid accidental bold', () => {
		expect(toTypst('rate * 2')).toContain('rate \\* 2');
	});

	it('escapes _ in text to avoid accidental italic', () => {
		expect(toTypst('snake_case')).toContain('snake\\_case');
	});

	it('escapes backslash', () => {
		expect(toTypst('path: C:\\Windows')).toContain('C:\\\\Windows');
	});

	it('escapes = at line start', () => {
		// A paragraph starting with = would open a heading in typst markup
		expect(toTypst('= not a heading')).toContain('\\= not a heading');
	});

	it('does not escape inside code blocks', () => {
		const result = toTypst('```\nfoo#bar $x @y\n```');
		// Code content should pass through verbatim
		expect(result).toContain('foo#bar $x @y');
	});

	it('does not escape inside inline code', () => {
		const result = toTypst('Use `#include`');
		expect(result).toContain('`#include`');
	});
});

// ---------------------------------------------------------------------------
// Inline node types
// ---------------------------------------------------------------------------

describe('inline nodes', () => {
	it('emphasis', () => {
		expect(toTypst('*italic*')).toContain('_italic_');
	});

	it('strong', () => {
		expect(toTypst('**bold**')).toContain('*bold*');
	});

	it('inline code', () => {
		expect(toTypst('Use `foo()`')).toContain('`foo()`');
	});

	it('inline code with backtick falls back to raw()', () => {
		// A backtick inside inline code must use #raw(...)
		const result = toTypst('Use `` a`b ``');
		expect(result).toContain('#raw(');
		expect(result).toContain('a`b');
	});

	it('link', () => {
		const result = toTypst('[Example](https://example.com)');
		expect(result).toContain('#link("https://example.com")[Example]');
	});

	it('image rewrites root-relative path', () => {
		const result = toTypst('![alt](/foo.png)');
		expect(result).toContain('#image("static/foo.png"');
	});

	it('image keeps non-root-relative path', () => {
		const result = toTypst('![alt](images/foo.png)');
		expect(result).toContain('#image("images/foo.png"');
	});
});

// ---------------------------------------------------------------------------
// Block node types
// ---------------------------------------------------------------------------

describe('block nodes', () => {
	it('paragraph ends with double newline', () => {
		const result = toTypst('Hello world');
		expect(result).toMatch(/Hello world\n\n/);
	});

	it('heading depth 1 with default offset', () => {
		const result = toTypst('# Heading');
		expect(result).toMatch(/^= Heading\n\n/);
	});

	it('heading depth 2 with default offset', () => {
		const result = toTypst('## Sub');
		expect(result).toMatch(/^== Sub\n\n/);
	});

	it('headingOffset shifts all depths', () => {
		const result = toTypst('# H1\n## H2', { headingOffset: 1 });
		expect(result).toContain('== H1');
		expect(result).toContain('=== H2');
	});

	it('fenced code block preserves language tag', () => {
		const result = toTypst('```typescript\nconst x = 1;\n```');
		expect(result).toContain('```typescript');
		expect(result).toContain('const x = 1;');
	});

	it('unordered list', () => {
		const result = toTypst('- alpha\n- beta');
		expect(result).toContain('- alpha');
		expect(result).toContain('- beta');
	});

	it('ordered list', () => {
		const result = toTypst('1. first\n2. second');
		expect(result).toContain('+ first');
		expect(result).toContain('+ second');
	});

	it('nested unordered list', () => {
		const result = toTypst('- outer\n  - inner');
		expect(result).toContain('- outer');
		expect(result).toContain('  - inner');
	});

	it('blockquote', () => {
		const result = toTypst('> quoted text');
		expect(result).toContain('#quote(block: true)');
		expect(result).toContain('quoted text');
	});

	it('thematic break', () => {
		const result = toTypst('---');
		expect(result).toContain('#line(length: 100%');
	});

	it('html nodes are skipped', () => {
		const result = toTypst('<div>ignored</div>');
		expect(result).not.toContain('<div>');
	});
});

// ---------------------------------------------------------------------------
// Footnotes via remarkFootnotesTypst
// ---------------------------------------------------------------------------

describe('remarkFootnotesTypst + mdastToTypst', () => {
	it('replaces [^id] with #footnote[...]', () => {
		const result = toTypst('A sentence.[^1]\n\n[^1]: Simple footnote text here.\n');
		expect(result).toContain('#footnote[Simple footnote text here.');
		expect(result).not.toContain('[^1]');
	});

	it('removes the definition paragraph from the body', () => {
		const result = toTypst('A sentence.[^1]\n\n[^1]: Simple footnote text here.\n');
		// The definition should appear only inside #footnote[...], not as a standalone paragraph
		const withoutFootnote = result.replace(/#footnote\[[\s\S]*?\]/g, '');
		expect(withoutFootnote).not.toContain('Simple footnote text here.');
	});

	it('handles multiple footnotes', () => {
		const body =
			'First.[^1] Second.[^2]\n\n[^1]: Simple plain text definition.\n[^2]: Another footnote definition.\n';
		const result = toTypst(body);
		expect(result).toContain('#footnote[Simple plain text definition.');
		expect(result).toContain('#footnote[Another footnote definition.');
	});

	it('serializes links inside footnote content', () => {
		const result = toTypst(
			'See note.[^note]\n\n[^note]: Text with a [link](https://example.com) inside here.\n'
		);
		expect(result).toContain('#link("https://example.com")[link]');
	});

	it('serializes inline code inside footnote content', () => {
		const result = toTypst('See note.[^code]\n\n[^code]: Use `inline code` snippet here.\n');
		expect(result).toContain('`inline code`');
	});

	it('handles blockquote continuation in footnote', () => {
		const body = `Text with a note.[^1]

[^1]: Adaptation qualities:
> - Item one
>     - Sub-item
> - Item two
`;
		const result = toTypst(body);
		expect(result).toContain('#footnote[');
		expect(result).toContain('Adaptation qualities:');
		expect(result).toContain('Item one');
	});

	it('leaves undefined footnote refs as literal text (remark-gfm behaviour)', () => {
		// remark-gfm only emits footnoteReference nodes when a matching
		// footnoteDefinition exists; otherwise the text is kept verbatim.
		const result = toTypst('Reference.[^missing]');
		expect(result).not.toContain('#footnote[');
		expect(result).toContain('missing');
	});
});

// ---------------------------------------------------------------------------
// Nested / complex structures
// ---------------------------------------------------------------------------

describe('nested structures', () => {
	it('emphasis inside a link label', () => {
		const result = toTypst('[*bold label*](https://example.com)');
		expect(result).toContain('#link("https://example.com")[_bold label_]');
	});

	it('inline code inside a paragraph with surrounding text', () => {
		const result = toTypst('Call `fn()` then return');
		expect(result).toContain('Call `fn()` then return');
	});

	it('multiple paragraphs', () => {
		const result = toTypst('First paragraph.\n\nSecond paragraph.');
		expect(result).toContain('First paragraph.\n\n');
		expect(result).toContain('Second paragraph.\n\n');
	});

	it('heading followed by paragraph', () => {
		const result = toTypst('## Section\n\nBody text.');
		expect(result).toContain('== Section\n\n');
		expect(result).toContain('Body text.\n\n');
	});

	it('list item with multiple paragraphs (loose list)', () => {
		const result = toTypst('- First para\n\n  Second para\n');
		expect(result).toContain('- First para');
		expect(result).toContain('Second para');
	});
});
