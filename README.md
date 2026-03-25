# xylix.github.io

My personal blog website. Forked from haihala.github.io, basic techs are Svelte + markdown. Migrated to this from Ghost when I got annoyed by the need to update and the overkill amount of features for my needs.

Hosted on https://xylix.fi

## Developing

install dependencies with `npm install` and start a development server with `npm
run dev`. Then press o+enter to open the dev server site in a browser tab. You
can do `npm run dev -- --open` to open the tab automatically.

To create a production version of your app, run `npm run build`. It goes into
the `build` directory. Sometimes it is smart to see it builds before pushing.

### CI

CI builds the svelte app with the static adapter and uploads it to Github
pages.

## Feature ideas

### Precise revision history links

Post frontmatter stores `updatedAt` as an array of timestamps representing meaningful revisions. Each revision date currently links to the file's full commit history on GitHub, which is honest but imprecise — a reader can't navigate directly to the exact state of the post at a given revision date.

A more exact approach would store timestamp–commit hash pairs in the frontmatter:

```yaml
updatedAt:
  - date: '2022-11-19'
    commit: null # pre-migration, no git history
  - date: '2026-03-18'
    commit: 'abc1234'
```

This would allow linking directly to `github.com/.../commit/abc1234` for each revision, giving readers a precise diff and surviving repo moves or branch renames. The downside is workflow friction: after every meaningful edit you'd need to find the commit hash and manually update the frontmatter, which is tedious enough to be unreliable without automation — for example a post-commit hook that appends the new commit hash to the frontmatter of any modified post file.


## Possible technical refactors

### Unify sequence/tag page rendering with blog post rendering

Sequence and tag pages render markdown prose via `<data.content />` but have their own page layouts and CSS, leading to divergence from blog post features (footnotes, typography, etc.). Because they share the same mdsvex compilation pipeline, the prose section could be extracted into a shared Svelte component used by all three page types. Sequences would keep their tree rendering below the prose; the shared component would handle footnotes styling, `<section class="footnotes">` visibility, and any future prose features added to blog posts.

Worth noting: the `remarkFootnotes` plugin requires definitions to be **multi-word** (a limitation of unified v9 bundled with mdsvex) — single-token URL-only definitions like `[^1]: https://example.com` are consumed by remark as link definitions and never reach the plugin. Definitions must have at least two words, e.g. `[^1]: Source: https://example.com`.
