const { copyFileSync, readFileSync } = require('node:fs');
const terser = require('@rollup/plugin-terser');
const babel = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

const pkg = (() => {
  return JSON.parse(readFileSync('./package.json', 'utf8'));
})();

const banner = `
/**
 *  ${pkg.name} - v${pkg.version}
 *  @author Henry Hale
 *  @license MIT
 *  @url ${pkg.homepage}
 */`;

function copyToDist() {
  return {
    closeBundle: () => {
      copyFileSync('./LICENSE.txt', './dist/LICENSE.txt');
      console.log(`[Y]: copied license file to dist/`);
      copyFileSync('./types/vitesh.d.ts', './dist/vitesh.d.ts');
      console.log(`[Y]: copied type declaration file to dist/`);
    },
  };
}

module.exports = {
  input: 'out/index.js',
  output: {
    name: 'Shell',
    file: pkg.browser,
    format: 'umd',
    banner,
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: { __VERSION__: pkg.version },
    }),
    commonjs(),
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    terser(),
    copyToDist(),
  ],
};
