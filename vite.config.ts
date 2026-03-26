import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { gitMetaPlugin } from './vite-git-meta';

export default defineConfig({
	plugins: [gitMetaPlugin(), sveltekit()],
	esbuild: {
		supported: {
			'top-level-await': true
		}
	}
});
