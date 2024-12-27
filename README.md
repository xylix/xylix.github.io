# xylix.github.io

My personal blog website. Forked from haihala.github.io, basic techs are Svelte + markdown. Migrated to this from Ghost when I got annoyed by the need to update and the overkill amount of features for my needs.

## Developing

install dependencies with `npm install` and start a development server with `npm
run dev`. Then press o+enter to open the dev server site in a browser tab. You
can do `npm run dev -- --open` to open the tab automatically.

To create a production version of your app, run `npm run build`. It goes into
the `build` directory. Sometimes it is smart to see it builds before pushing.

### CI

CI builds the svelte app with the static adapter and uploads it to Github
pages.
