import { createSelector } from '../../utils';
import { State } from '../state';

const getMarkets = (state: State) => state.markets;

const getData = createSelector(getMarkets, m => m.data);

export const getMarketList = createSelector(getData, d => (d ? d.markets : []));

const getLookup = createSelector(getMarkets, markets => markets.lookup);

const getMarketsById = createSelector(
  getLookup,
  lookup => (lookup ? lookup.byMarketId : {})
);

const getMarketsByTicker = createSelector(
  getLookup,
  lookup => (lookup ? lookup.byMarketTicker : {})
);

const getMarketsByNameFormatted = createSelector(
  getLookup,
  lookup => (lookup ? lookup.byMarketNameFormatted : {})
);

const createMarketGetter = (
  marketHashLookup: (state: State) => { [key: string]: number }
) => (state: State, key: number | string) => {
  const index = marketHashLookup(state)[key.toString()];
  const marketList = getMarketList(state);
  const market = marketList[index];
  if (market) {
    return market;
  }
};

export const getMarketById = createMarketGetter(getMarketsById);

export const getMarketByTicker = createMarketGetter(getMarketsByTicker);

export const getMarketByNameFormatted = createMarketGetter(
  getMarketsByNameFormatted
);

export const getMarket = (state: State, id: string | number) =>
  getMarketById(state, id) ||
  getMarketByNameFormatted(state, id) ||
  getMarketByTicker(state, id);

export const getLoading = createSelector(
  getMarkets,
  m => !!(m.requesting && !m.data)
);

export const getUpdatedAt = createSelector(
  getData,
  d => (d ? new Date(d.updatedAt) : undefined)
);

export const getMinimumDataDate = createSelector(getMarketList, m =>
  m.reduce((out, market) => {
    const minDate = Math.min(...market.contracts.map(c => c.series.start));
    return out > minDate ? minDate : out;
  }, Infinity)
);

export const getFavorites = createSelector(
  getMarkets,
  markets => markets.favorites || []
);

export const getFavoritesCount = createSelector(
  getFavorites,
  favorites => favorites.length
);

export const isFavorite = (state: State, id: number) => {
  const favorites = getFavorites(state);
  return favorites.indexOf(id) !== -1;
};
