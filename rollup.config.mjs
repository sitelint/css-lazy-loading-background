/* eslint-disable no-process-env */
import typescript from 'rollup-plugin-typescript2';
import html from 'rollup-plugin-html';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-minification';
import { visualizer } from 'rollup-plugin-visualizer';
import dts from 'rollup-plugin-dts';

const defaults = {
  compilerOptions: {
    declaration: true
  }
};
const override = {
  compilerOptions: {
    declaration: false,
    module: 'es6'
  }
};

const config = {
  input: 'src/css-lazy-loading-background.ts',
  output: [
    {
      file: './dist/css-lazy-loading-background.js',
      format: 'umd',
      name: 'css-lazy-loading-background'
    },
    {
      file: './dist/css-lazy-loading-background.mjs',
      format: 'es'
    }
  ],
  plugins: [
    html({
      include: '**/*.html'
    }),
    commonjs({
      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false

      /*
       * non-CommonJS modules will be ignored, but you can also
       * specifically include/exclude files
       */
      include: ['./index.js', 'node_modules/**'], // Default: undefined

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false // Default: true
    }),
    resolve({
      preferBuiltins: true
    }),
    typescript({
      clean: process.env.BUILD === 'development' || false,
      declaration: true,
      exclude: ['*.test*', '**/*.test*', '*.spec*', '**/*.spec*'],
      objectHashIgnoreUnknownHack: false,
      tsconfig: './tsconfig.json',
      tsconfigDefaults: defaults,
      tsconfigOverride: override
    }),
    json()
  ]
};

const tsDeclarationsConfig = {
  input: './src/css-lazy-loading-background.ts',
  output: [{
    file: 'dist/css-lazy-loading-background.d.ts',
    format: 'es'
  }],
  plugins: [
    dts()
  ]
};

if (process.env.BUILD === 'production') {
  // minifies generated bundles
  config.plugins.push(terser());
}

if (process.env.BUILD === 'development') {
  config.plugins.push(visualizer({
    filename: './stats/stats.html'
  }));
}

export default [config, tsDeclarationsConfig];
