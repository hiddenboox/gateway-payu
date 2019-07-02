import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import builtinModules from 'builtin-modules';

import pkg from './package.json';

export default [
	{
		input: 'src/index.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
        ],
        external: [...builtinModules],
        plugins: [
            json(),
            commonjs(),
        ]
	}
];