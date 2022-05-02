import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

const env = {
  ...config({
    path: ".env",
  }).parsed,
  ...process.env,
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: "LC_",
  env,
  server: {
    proxy: {
      "/koa": {
        target: env.LC_KOA_PATH,
        rewrite: (path) => path.replace(/^\/koa/, ""),
      },
    },
  },
});
