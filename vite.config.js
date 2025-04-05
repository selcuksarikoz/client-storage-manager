import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    test: {
        environment: 'jsdom',
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ClientStorageManager',
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'), // Add your index.html as an input
                lib: resolve(__dirname, 'src/index.ts'), // Keep your library entry
            },
            output: {
                dir: resolve(__dirname, 'dist'),
                entryFileNames: '[name].js',
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            outDir: 'dist',
        }),
    ],
});