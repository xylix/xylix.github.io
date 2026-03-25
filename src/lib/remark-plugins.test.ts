/**
 * Integration tests for the custom remark plugins (remarkFootnotes,
 * remarkFlattenThreadBullets).  We run them through the same mdsvex pipeline
 * that the site uses so the tests exercise real behaviour rather than
 * a re-constructed approximation.
 *
 * Key quirk: mdsvex bundles an older remark (unified v9) whose parser only
 * produces `linkReference` nodes for `[^id]` when the surrounding definitions
 * live in the same paragraph (consecutive lines, no blank lines between them).
 * Single-definition blocks must therefore have multi-word text (spaces) so
 * they aren't swallowed as link definitions by that remark version.
 */
import { mdsvex } from 'mdsvex';
import { describe, it, expect } from 'vitest';
import { remarkFootnotes, remarkFlattenThreadBullets } from './remark-plugins.js';

const FRONTMATTER = `---
title: Test
tags: [test]
createdAt: 2024-01-01
wordCount: 5
`;

async function renderHtml(body: string, extraFrontmatter = ''): Promise<string> {
	const preprocessor = mdsvex({
		extensions: ['.md'],
		remarkPlugins: [remarkFlattenThreadBullets, remarkFootnotes]
	});
	const content = `${FRONTMATTER}${extraFrontmatter}---\n\n${body}`;
	const result = await preprocessor.markup({ content, filename: 'test.md' });
	// Strip <script context="module">…</script> boilerplate
	return (result?.code ?? '').replace(/<script[\s\S]*?<\/script>/g, '').trim();
}

// ---------------------------------------------------------------------------
// remarkFootnotes
// ---------------------------------------------------------------------------

describe('remarkFootnotes', () => {
	it('replaces a footnote reference with a superscript link', async () => {
		const html = await renderHtml('A sentence.[^1]\n\n[^1]: Simple footnote text here.\n');
		expect(html).toContain('<sup class="fn-ref" id="fnref-1">');
		expect(html).toContain('<a href="#fn-1">1</a>');
	});

	it('appends a <section class="footnotes"> at the end', async () => {
		const html = await renderHtml('A sentence.[^1]\n\n[^1]: Simple footnote text here.\n');
		expect(html).toContain('<section class="footnotes">');
		expect(html).toContain('<li id="fn-1">');
		expect(html).toContain('Simple footnote text here.');
		expect(html).toContain('<a href="#fnref-1" class="fn-back">↩</a>');
	});

	it('removes the footnote definition from the body', async () => {
		const html = await renderHtml('A sentence.[^1]\n\n[^1]: Simple footnote text here.\n');
		// Definition should only appear inside the footnotes section, not as a
		// bare paragraph
		const withoutSection = html.replace(/<section[\s\S]*?<\/section>/g, '');
		expect(withoutSection).not.toContain('[^1]');
		expect(withoutSection).not.toContain('Simple footnote text here.');
	});

	it('handles multiple consecutive footnote definitions', async () => {
		// Definitions must be on consecutive lines (no blank lines) so that
		// older remark lands them in one paragraph instead of link-definitions.
		const body =
			'First.[^1] Second.[^2]\n\n[^1]: Simple plain text definition.\n[^2]: Another footnote definition.\n';
		const html = await renderHtml(body);
		expect(html).toContain('<li id="fn-1">');
		expect(html).toContain('<li id="fn-2">');
		expect(html).toContain('Simple plain text definition.');
		expect(html).toContain('Another footnote definition.');
	});

	it('serializes links inside footnote definitions', async () => {
		const body =
			'See note.[^note]\n\n[^note]: Text with a [link](https://example.com) inside here.\n';
		const html = await renderHtml(body);
		expect(html).toContain('<a href="https://example.com">link</a>');
	});

	it('serializes inline code inside footnote definitions', async () => {
		const body = 'See note.[^code]\n\n[^code]: Use `inline code` snippet here.\n';
		const html = await renderHtml(body);
		expect(html).toContain('<code>inline code</code>');
	});

	it('does nothing when there are no footnotes', async () => {
		const html = await renderHtml(
			'Just a paragraph with a [regular link](https://example.com).\n'
		);
		expect(html).not.toContain('fn-ref');
		expect(html).not.toContain('footnotes');
	});
});

// ---------------------------------------------------------------------------
// remarkFlattenThreadBullets
// ---------------------------------------------------------------------------

describe('remarkFlattenThreadBullets', () => {
	it('leaves lists untouched when format is not thread', async () => {
		const html = await renderHtml('- Item one\n- Item two\n- Item three\n');
		// Standard list rendering – no <hr> separators
		expect(html).toContain('<li>');
		expect(html).not.toContain('<hr>');
	});

	it('flattens a bullet list into paragraphs for thread format', async () => {
		const html = await renderHtml('- Item one\n- Item two\n- Item three\n', 'format: thread\n');
		expect(html).not.toContain('<li>');
		expect(html).toContain('<p>');
	});

	it('inserts <hr> separators between thread items', async () => {
		const html = await renderHtml('- Alpha\n- Beta\n- Gamma\n', 'format: thread\n');
		// 3 items → 2 <hr> separators
		const hrCount = (html.match(/<hr>/g) ?? []).length;
		expect(hrCount).toBe(2);
		expect(html).toContain('<p>Alpha</p>');
		expect(html).toContain('<p>Beta</p>');
		expect(html).toContain('<p>Gamma</p>');
	});

	it('flattens nested lists recursively', async () => {
		const html = await renderHtml(
			'- Outer\n  - Inner A\n  - Inner B\n',
			'format: thread\n'
		);
		expect(html).not.toContain('<li>');
		expect(html).toContain('<p>');
	});
});

// ---------------------------------------------------------------------------
// Combined: footnotes in a thread post
// ---------------------------------------------------------------------------

describe('remarkFootnotes + remarkFlattenThreadBullets combined', () => {
	it('handles footnotes inside a thread post', async () => {
		const body =
			'- First item with a note.[^1]\n- Second item\n\n[^1]: Thread footnote text here.\n';
		const html = await renderHtml(body, 'format: thread\n');
		expect(html).toContain('<sup class="fn-ref"');
		expect(html).toContain('<section class="footnotes">');
		expect(html).toContain('Thread footnote text here.');
		expect(html).not.toContain('<li>');
		expect(html).toContain('<hr>');
	});
});
