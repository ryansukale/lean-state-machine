import { terser } from 'rollup-plugin-terser';
import fileSize from 'rollup-plugin-filesize';
import pkg from './package.json';
const buildEnv = process.env.BUILD_ENV;

const createConfig = ({ input, output, tsconfig = undefined }) => ({
  input,
  output,
  plugins: [
    // typescript({
    //   clean: true,
    //   tsconfig
    // }),
    // terser({
    //   toplevel: true
    // }),
    fileSize()
  ]
});

export default [
  createConfig({
    input: 'src/index.js',
    output: {
      file: {
        es: pkg.module,
        cjs: pkg.main
      }[buildEnv],
      format: buildEnv,
    }
  })
  // createConfig({
  //   input: 'src/plugins/expose.js',
  //   output: {
  //     file: 'dist/plugins/expose.js',
  //     format: 'umd',
  //     name: 'createMachine'
  //   }
  // })
];