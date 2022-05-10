import { moduleInterop } from '@textlint/module-interop';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslintPlugin from 'vite-plugin-eslint';
import { createHtmlPlugin } from 'vite-plugin-html';

const dirName = path.dirname(fileURLToPath(import.meta.url));

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
    envPrefix: 'REACT_APP_',
    plugins: [
      eslintPlugin(),
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
  };
});
