import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
		coverage: {
			reporter: ["text", "html"], 
			exclude: ["src/types", "src/data", "src/main.tsx", "src/vite-env.d.ts", "src/__tests__", "**.config.*"],
		},
	}
});
