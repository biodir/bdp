import { defineConfig } from "vitest/config";
import { reactRouter } from "@react-router/dev/vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { intlayerPlugin } from "vite-intlayer";

export default defineConfig({
    plugins: [
        !process.env.VITEST &&
            reactRouter({
                appDirectory: "src",
            }),
        tailwindcss(),
        intlayerPlugin(),
    ].filter(Boolean),
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/test/setup.ts",
        css: true,
    },
});
