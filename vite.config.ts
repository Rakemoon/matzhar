import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

import unpluginIcons from "unplugin-icons/vite";

export default defineConfig({
    plugins: [
        sveltekit() as never,
        unpluginIcons({ compiler: "svelte" }) as never,
    ],
    test: {
        include: ["src/**/*.{test,spec}.{js,ts}"],
    },
});
