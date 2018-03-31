import typescript from 'rollup-plugin-typescript2';

export default {
  input: `./src/lambda/handlers/${process.env.FN}.ts`,
  output: {
    file: `./dist/index.js`,
    format: 'cjs'
  },
  context: 'global',
  plugins: [typescript({ tsconfig: require.resolve('./tsconfig.json') })],
  external: Object.keys(require('../../package.json').dependencies).concat([
    'zlib'
  ])
};
