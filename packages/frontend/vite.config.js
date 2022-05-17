import { moduleInterop } from '@textlint/module-interop';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslintPlugin from 'vite-plugin-eslint';
import { createHtmlPlugin } from 'vite-plugin-html';
import { config } from 'dotenv';

const container = process.env.LC_CONTAINER === 'true';
const dirName = path.dirname(fileURLToPath(import.meta.url));

const env = {
  ...config({
    path: '.env',
  }).parsed,
  ...process.env,
};

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    optimizeDeps: {
      include: [],
    },
    build: {
      minify: isProduction,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    envPrefix: 'LC_',
    plugins: [
      container ? undefined : eslintPlugin(),
      createHtmlPlugin(),
      moduleInterop(checker)({ typescript: true }),
      react({
        babel: {
          compact: isProduction,
        },
      }),
    ],
    resolve: {
      alias: [{ find: '~', replacement: path.join(dirName, 'src') }],
    },
    env,
    server: {
      proxy: {
        '/backend': {
          target: env.LC_BACKEND_PATH,
          rewrite: (path) => path.replace(/^\/backend/, ''),
        },
        '/production': {
          target: env.LC_PRODUCTION_PATH,
          rewrite: (path) => path.replace(/^\/production/, ''),
        },
      },
    },
  };
});
