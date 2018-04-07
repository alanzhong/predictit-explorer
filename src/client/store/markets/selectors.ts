import { createSelector } from '../../utils';
import { State } from '../state';

/**
 * get the raw market state prop
 */
const getMarkets = (state: State) => state.markets;

/**
 * get the raw market data
 */
const getData = createSelector(getMarkets, m => m.data);

/**
 * get the list of all markets in the data
 */
export const getMarketList = createSelector(getData, d => (d ? d.markets : []));

/**
 * get the collection of market hashes
 */
const getLookup = createSelector(getMarkets, markets => markets.lookup);

/**
 * get the hash of market id to markets
 */
const getMarketsById = createSelector(
  getLookup,
  lookup => (lookup ? lookup.byMarketId : {})
);

/**
 * get the hash of ticker name to markets
 */
const getMarketsByTicker = createSelector(
  getLookup,
  lookup => (lookup ? lookup.byMarketTicker : {})
);

/**
 * get the hash of kebab case market name to markets
 */
const getMarketsByNameFormatted = createSelector(
  getLookup,
  lookup => (lookup ? lookup.byMarketNameFormatted : {})
);

/**
 * create a market string lookup selector
 */
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

/**
 * lookup market by id
 */
export const getMarketById = createMarketGetter(getMarketsById);

/**
 * lookup market by ticker
 */
export const getMarketByTicker = createMarketGetter(getMarketsByTicker);

/**
 * lookup market by kebab case name
 */
export const getMarketByNameFormatted = createMarketGetter(
  getMarketsByNameFormatted
);

/**
 * get a market by several types of lookup
 */
export const getMarket = (state: State, id: string | number) =>
  getMarketById(state, id) ||
  getMarketByNameFormatted(state, id) ||
  getMarketByTicker(state, id);

/**
 * check if we are currently retrieving market data
 */
export const getLoading = createSelector(
  getMarkets,
  m => !!(m.requesting && !m.data)
);

/**
 * get the date of the last data update
 */
export const getUpdatedAt = createSelector(
  getData,
  d => (d ? new Date(d.updatedAt) : undefined)
);

/**
 * get minimum date accross all data
 */
export const getMinimumDataDate = createSelector(getMarketList, m =>
  m.reduce((out, market) => {
    const minDate = Math.min(...market.contracts.map(c => c.series.start));
    return out > minDate ? minDate : out;
  }, Infinity)
);

/**
 * list of favorite market ids
 */
export const getFavorites = createSelector(
  getMarkets,
  markets => markets.favorites || []
);

/**
 * number of user favorites
 */
export const getFavoritesCount = createSelector(
  getFavorites,
  favorites => favorites.length
);

/**
 * check if market is a favorite
 */
export const isFavorite = (state: State, id: number) => {
  const favorites = getFavorites(state);
  return favorites.indexOf(id) !== -1;
};
