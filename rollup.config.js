import { terser } from 'rollup-plugin-terser';
import fileSize from 'rollup-plugin-filesize';

const createConfig = ({ input, output, tsconfig = undefined }) => ({
  input,
  output,
  plugins: [
    // typescript({
    //   clean: true,
    //   tsconfig
    // }),
    terser({
      toplevel: true
    }),
    fileSize()
  ]
});

export default [
  createConfig({
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'index'
    }
  }),
  createConfig({
    input: 'src/plugins/expose.js',
    output: {
      file: 'dist/plugins/expose.js',
      format: 'umd',
      name: 'createMachine'
    }
  })
];