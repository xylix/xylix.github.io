import { describe, expect, it } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type { Root } from 'mdast';
import { mdastToTypst } from './mdast-to-typst';
import { remarkFootnotesTypst } from './remark-footnotes-typst';

function parse(markdown: string): Root {
	return unified().use(remarkParse).parse(markdown) as Root;
}

describe('mdastToTypst', () => {
	it('serializes headings and paragraphs', () => {
		const typst = mdastToTypst(parse('# Title\n\nPlain text here.'));
		expect(typst).toContain('= Title');
		expect(typst).toContain('Plain text here.');
	});

	it('escapes typst syntax in text nodes', () => {
		const typst = mdastToTypst(parse('Price #1 costs $5 and uses [brackets].'));
		expect(typst).toContain('Price \\#1 costs \\$5 and uses \\[brackets\\].');
	});

	it('serializes images and links', () => {
		const typst = mdastToTypst(parse('![alt](/image.png)\n\n[Example](https://example.com)'));
		expect(typst).toContain('#figure(image("../static/image.png", width: 80%), caption: [alt])');
		expect(typst).toContain('#link("https://example.com")[Example]');
	});

	it('serializes nested lists', () => {
		const typst = mdastToTypst(parse('- Alpha\n  - Beta\n- Gamma\n'));
		expect(typst).toContain('- Alpha');
		expect(typst).toContain('  - Beta');
		expect(typst).toContain('- Gamma');
	});

	it('serializes nested emphasis and strong without typst underscore collisions', () => {
		const typst = mdastToTypst(parse('Nested _*mask*_ styling.\n'));
		expect(typst).toContain('#emph[');
		expect(typst).not.toContain('__mask__');
	});

	it('serializes typst footnotes', async () => {
		const processor = unified().use(remarkParse).use(remarkGfm).use(remarkFootnotesTypst);
		const file = processor.parse('Sentence.[^1]\n\n[^1]: Footnote with a [link](https://example.com).\n');
		const tree = (await processor.run(file)) as Root;
		const typst = mdastToTypst(tree);
		expect(typst).toContain('Sentence.#footnote[Footnote with a #link("https://example.com")[link].]');
	});
});
