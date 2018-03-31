import { combineReducers } from 'redux';
import { State } from './state';

import { controls } from './controls';
import { markets } from './markets';
import { router } from './router';

export const reducer = combineReducers<State | undefined>({
  router,
  markets,
  controls
});
