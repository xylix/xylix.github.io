/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['*.svelte'],
			extends: ['plugin:svelte/recommended'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				sourceType: 'module',
				ecmaVersion: 2020,
				extraFileExtensions: ['.svelte']
			},
			env: {
				browser: true,
				es2017: true
			}
		}
	]
};
