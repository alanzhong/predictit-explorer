import npm from 'rollup-plugin-node-resolve';

export default {
  input: require.resolve('./d3.ts'),
  output: {
    file: 'dist/d3-bundle.js',
    format: 'es'
  },
  plugins: [npm({ jsnext: true })]
};
