import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		exclude: [...configDefaults.exclude, "cdk.out"],
		include: ["**/test/*.{test,spec}.?(c|m)[jt]s?(x)"],
	},
});
