import { terser } from 'rollup-plugin-terser';
import fileSize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';
const buildEnv = process.env.BUILD_ENV;

const createConfig = ({ input, output, tsconfig = undefined }) => ({
  input,
  output,
  plugins: [
    terser({
      toplevel: true
    }),
    fileSize(),
    resolve()
  ]
});

export default [
  {
    input: 'src/index.js',
    output: [
      {
        dir: 'dist',
        format: 'esm'
      }
    ],
    preserveModules: true,
    plugins: [resolve()]
  },
  createConfig({
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
    }
  }),
  createConfig({
    input: 'src/index.js',
    output: {
      file: pkg.main,
      format: 'cjs'
    }
  })
];