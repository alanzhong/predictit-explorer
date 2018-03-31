import 'promise-polyfill';
import { cssRule } from 'typestyle';
import 'whatwg-fetch';

/**
 * handle s3 redirects
 */
if (location.hash.length > 0 && location.hash.substring(0, 2) === '#!') {
  history.pushState({}, '', location.hash.substring(2));
}

// base body styles...
cssRule('html, body', {
  width: '100%',
  height: '100%',
  padding: '0px',
  margin: '0px',
  boxSizing: 'border-box',
  fontWeight: 300,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(', ')
});

cssRule('h1, h2, h3, h4', {
  fontWeight: 300
});
