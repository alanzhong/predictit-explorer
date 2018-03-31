import { createSelector } from '../../utils';
import { State } from '../state';
import { MarketFilters } from './filters';

export const getRouter = (state: State) => state.router;

export const getPathName = createSelector(getRouter, r => r.pathname);
export const getParams = createSelector(getRouter, r => r.params);

export const getQuery = createSelector(
  getRouter,
  router => (router ? router.query || {} : {})
);

export const getSearchQuery = createSelector(getQuery, q => q.q || '');

export const getPage = createSelector(getQuery, q =>
  parseInt(q.page || '1', 10)
);

export const getFilter = createSelector(getQuery, q =>
  parseInt(q.filter || '0', 10)
);

/**
 * count binary digits
 */
export const getFilterCount = createSelector(getFilter, filter =>
  filter
    .toString(2)
    .split('')
    .reduce((out, digit) => out + parseInt(digit, 10), 0)
);
