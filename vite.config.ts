import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},
});
