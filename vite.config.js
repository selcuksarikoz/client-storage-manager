import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    test: {
        environment: 'jsdom', // Use jsdom for a browser-like environment
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'), // Your main entry point file
            name: 'ClientStorageManager', // The name of your library (not really used for ESM output)
            fileName: 'index', // The name of the generated output file (without extension)
            formats: ['es'], // Output only as ES module
        },
        rollupOptions: {
            // Externalize dependencies that you don't want to bundle
            // into your library.
            // external: [],
            output: {
                // Since we are building as an ES library, we don't need to configure globals.
                // Provide global variables to use in the UMD build
                // when proper external are not used.
                // globals: {},
                dir: resolve(__dirname, 'dist'), // Output directory
                entryFileNames: '[name].js', // Output file name will be index.js
            },
        },
        outDir: 'dist', // Ensure this matches rollupOptions.output.dir for consistency
        emptyOutDir: true, // Clean the output directory before each build
    },
    plugins: [
        dts({
            insertTypesEntry: true, // Generate a .d.ts entry file
            outDir: 'dist', // Ensure this matches build.outDir
        }),
    ],
});