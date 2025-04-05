import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo?.name?.endsWith('.js')) {
                        return '[name].js';
                    }
                    return 'assets/[name].[ext]';
                },
                chunkFileNames: '[name].js',
                entryFileNames: '[name].js',
            },
        },
    },
    plugins: [
        dts({
            outDir: 'dist',
        }),
    ],
});