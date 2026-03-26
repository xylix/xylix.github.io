# Claude Code preferences for this project

- Do not commit code to version control before running the code.
- When implementing a feature that involves a user-facing interface and the placement/integration is not specified, ask before implementing rather than choosing a default.
- When adding new rendering features to `svelte.config.js` (new remark plugins, changes to existing plugins), add corresponding tests in `src/lib/remark-plugins.test.ts`. Tests run through the full mdsvex pipeline (`npm test`).
- When editing human-authored text (about page, blog posts without an "ai" tag or AI disclaimer), avoid stylistic choices stereotypical to AI writing, such as em dashes (—), excessive hedging, or overly formal transitions. These style constraints do not apply to content that is AI-generated and presented as such.
