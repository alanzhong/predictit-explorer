import { readFileSync } from 'fs';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';
import virtual from 'rollup-plugin-virtual';
import visualize from 'rollup-plugin-visualizer';

const prod = process.env.NODE_ENV === 'production';
const viz = !!process.env.VIZ;

/**
 * dirt-nasty export issue hack:
 *
 * Rollup freeze commonjs exports, and fuse exports the class as module.exports = ...
 */
const fuseVirtual = `
  var exports = {};
  var module = { exports: exports };

  (function(){
    ${readFileSync(require.resolve('fuse.js')).toString()}
  }).call(window);

  export default module.exports;
`;

const d3Virtual = readFileSync('./dist/d3-bundle.js').toString();

const plugins = [
  virtual({
    'fuse-virtual': fuseVirtual,
    'd3-virtual': d3Virtual
  }),
  typescript({ tsconfig: require.resolve('./tsconfig.json') }),
  resolve({ jsnext: true }),
  commonjs({
    namedExports: {
      react: [
        'createElement',
        'cloneElement',
        'Component',
        'PureComponent',
        'Children',
        'Fragment',
        'StrictMode'
      ],
      'react-dom': ['render', 'createPortal', 'findDOMNode'],
      'react-dom/server': ['renderToString']
    }
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development')
  })
];

if (viz) {
  plugins.push(
    visualize({
      filename: './dist/stats.html'
    })
  );
} else if (prod) {
  plugins.push(uglify());
} else {
  plugins.push(
    serve({ open: true, contentBase: 'public', historyApiFallback: true }),
    livereload()
  );
}

export default {
  input: require.resolve('./index.tsx'),
  plugins,
  output: {
    file: 'public/bundle.js',
    format: 'iife'
  },
  moduleContext: {
    [require.resolve('whatwg-fetch')]: 'window',
    [require.resolve('free-style/dist.es2015/free-style.js')]: 'window'
  }
};
