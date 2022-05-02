import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

const env = {
  ...config({
    path: ".env",
  }).parsed,
  ...process.env,
};

console.log("KOA", env.LC_KOA_PATH);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: "LC_",
  server: {
    proxy: {
      "/koa": {
        target: env.LC_KOA_PATH,
        rewrite: (path) => path.replace(/^\/koa/, ""),
      },
    },
  },
});
