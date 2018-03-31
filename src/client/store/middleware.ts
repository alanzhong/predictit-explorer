import { Middleware } from 'redux';
import thunk from 'redux-thunk';
import { middleware as routerMiddleware } from './router';

export const middleware: Middleware[] = [thunk, routerMiddleware];
