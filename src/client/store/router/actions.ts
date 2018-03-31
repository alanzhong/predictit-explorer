import { Query, replace } from 'redux-little-router';
import { ThunkAction } from '../state';
import { MarketFilters } from './filters';
import { getFilter, getQuery } from './selectors';

export const updateQuery = (query: Query): ThunkAction => dispatch => {
  dispatch(
    replace(
      {
        pathname: '/',
        query
      },
      { persistQuery: true }
    )
  );
};

export const setFilter = (
  mask: MarketFilters,
  enable?: boolean
): ThunkAction => (dispatch, getState) => {
  const state = getState();
  const filter = getFilter(state);
  const { filter: __, page, ...rest } = getQuery(state);

  const updated = enable
    ? // turn mask on with bitwise OR
      filter | mask
    : // turn mask off with bitwise AND to negated mask
      filter & ~mask;

  dispatch(
    replace({
      pathname: '/',
      query:
        updated === 0
          ? rest
          : {
              ...rest,
              filter: updated.toString()
            }
    })
  );
};

export const updateSearchQuery = (q: string): ThunkAction => (
  dispatch,
  getState
) => {
  const query = getQuery(getState());
  const { q: __, page, ...rest } = query;

  dispatch(
    replace({
      pathname: '/',
      query: q ? { q, ...rest } : rest
    })
  );
};

export const setPage = (page: number): ThunkAction => (dispatch, getState) => {
  const query = getQuery(getState());
  const { page: __, ...rest } = query;

  dispatch(
    replace({
      pathname: '/',
      query: page === 1 ? rest : { ...rest, page: page.toString() }
    })
  );
};
