import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default [
    {
        input: 'main.js',
        output: {
            name: 'can',
            file: pkg.browser,
            format: umd,
        },
        plugins: [resolve(), commonjs()],
    },
    {
        input: 'main.js',
        external: ['ms'],
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' },
        ],
    },
];
