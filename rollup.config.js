import { terser } from 'rollup-plugin-terser';
import rollupReplace from 'rollup-plugin-replace';
import fileSize from 'rollup-plugin-filesize';

const createConfig = ({ input, output, tsconfig = undefined }) => ({
  input,
  output,
  plugins: [
    rollupReplace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
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
    input: 'src/createMachine.js',
    output: {
      file: 'dist/createMachine.js',
      format: 'umd',
      name: 'createMachine'
    }
  })
];