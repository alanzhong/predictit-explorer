import './preamble';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { forceRenderStyles } from 'typestyle';
import { App } from './components/app';
import { Dispatch, initStore, updateMarkets } from './store';

// augment typings to add strict mode
declare module 'react' {
  export const StrictMode: React.SFC;
}

main().catch(err => console.error(err));

async function main() {
  const store = initStore();
  const dispatch = store.dispatch as Dispatch;
  const root = document.getElementById('root');

  dispatch(updateMarkets());

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );

  forceRenderStyles();
}
