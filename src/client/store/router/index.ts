import {
  Location as RouterState,
  push,
  Query,
  replace,
  RouterActions,
  routerForBrowser
} from 'redux-little-router';
import { ThunkAction } from '../state';
import { routes } from './routes';

const { reducer: router, middleware, enhancer } = routerForBrowser({
  routes
});

export { router, middleware, enhancer, RouterActions, RouterState };

export * from './selectors';
export * from './actions';
export * from './filters';
export { RouterPaths } from './routes';
