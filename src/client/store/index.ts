import { applyMiddleware, compose, createStore } from 'redux';
import { enhancers } from './enhancers';
import {
  createLocalStorageSubscriber,
  getStateFromLocalStorage
} from './local-storage';
import { middleware } from './middleware';
import { reducer } from './reducer';
import { State } from './state';

import { setFavoriteMarkets } from './markets';

export * from './state';
export * from './actions';

export * from './markets';
export * from './router';
export * from './controls';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export function initStore(initialState?: State) {
  let composeEnhancers = compose;

  // in dev mode look for redux dev tools
  if (process.env.NODE_ENV !== 'production') {
    const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (reduxDevTools) {
      composeEnhancers = reduxDevTools;
    }
  }

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(...enhancers, applyMiddleware(...middleware))
  );

  const localStorageState = getStateFromLocalStorage();
  const localStorageSubscriber = createLocalStorageSubscriber();

  store.dispatch(setFavoriteMarkets(localStorageState.favorites || []));

  store.subscribe(() => {
    localStorageSubscriber(store.getState());
  });

  return store;
}
