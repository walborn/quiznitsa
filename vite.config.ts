import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;
// @ts-expect-error process is a nodejs global
const isGithubPages = process.env.GITHUB_PAGES;

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react(),
    VitePWA({
      // Auto-register and silently update the service worker.
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        // Precache the whole app shell AND every video so the quiz works fully
        // offline after the first visit — even questions never opened.
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest,mp4}"],
        // Videos are large; raise the per-file precache limit above the biggest.
        maximumFileSizeToCacheInBytes: 25 * 1024 * 1024,
      },
      manifest: {
        name: "Quiz",
        short_name: "Quiz",
        start_url: ".",
        display: "standalone",
        background_color: "#1f2024",
        theme_color: "#1f2024",
        icons: [{ src: "vite.svg", sizes: "any", type: "image/svg+xml" }],
      },
    }),
  ],

  // GitHub Pages serves project sites from /<repo>/. The deploy workflow sets
  // GITHUB_PAGES so this prefix only applies to the Pages build — Tauri builds
  // and local dev keep the root base.
  base: isGithubPages ? "/quiznitsa/" : "/",

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
