import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        ...VitePluginNode({
            adapter: 'nest',
            appPath: './src/main.ts',
            tsCompiler: 'esbuild'
        }),
        tsconfigPaths()
    ],
    optimizeDeps: {
        exclude: [
            '@nestjs/microservices',
            '@nestjs/websockets',
            'cache-manager',
            'class-transformer',
            'class-validator',
            'fastify-swagger'
        ]
    }
});
