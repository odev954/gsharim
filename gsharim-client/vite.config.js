import { defineConfig } from 'vite';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react'
import { comlink } from "vite-plugin-comlink";
import eslint from 'vite-plugin-eslint';


// https://vitejs.dev/config/
export default ({mode}) => {
  return defineConfig({
    server: {
      cors: true,
      port: 3000,
    },
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: ''
        },
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ],
      extensions: [
        '.mjs',
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.vue'
      ]
    },
    plugins: [
      tsconfigPaths(),
      svgr(),
      react(),
      comlink(),
      eslint()
    ],
    worker: {
      format: "es",
      plugins: [
        tsconfigPaths(),
        svgr(),
        comlink(),
        eslint()
      ],
    },
    build: {
      sourcemap: "inline",
      outDir: "build"
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: 'src/testSetup.ts',
      deps: {
        inline: ['vitest-canvas-mock'],
      },
    },
    optimizeDeps : {
      exclude: ["pyodide"]
    }
  })
}
