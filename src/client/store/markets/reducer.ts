import { flatten, indexHash, kebab } from '../../utils';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { MarketsState } from './state';

export function markets(
  state: MarketsState = {},
  action: Action
): MarketsState {
  switch (action.type) {
    case ActionType.UPDATE_MARKET_DATA_FAILURE: {
      return {
        ...state,
        requesting: false
      };
    }

    case ActionType.UPDATE_MARKET_DATA_SUCCESS: {
      const data = action.payload.data;
      const contracts = flatten(data.markets.map(m => m.contracts));

      return {
        ...state,
        data,
        contracts,
        requesting: false,
        lookup: {
          byMarketId: indexHash(data.markets, m => m.market_id),
          byMarketTicker: indexHash(data.markets, m => m.ticker_symbol),
          byMarketNameFormatted: indexHash(data.markets, m => kebab(m.name)),
          contractsById: indexHash(contracts, c => c.contract_id)
        }
      };
    }

    case ActionType.UPDATE_MARKET_DATA_REQUEST: {
      return {
        ...state,
        requesting: true
      };
    }

    case ActionType.SET_FAVORITE_MARKETS: {
      return {
        ...state,
        favorites: action.payload.ids
      };
    }

    case ActionType.REMOVE_FAVORITE_MARKET:
    case ActionType.ADD_FAVORITE_MARKET: {
      const id = action.payload.id;
      const oldFavorites = (state.favorites || []).slice();
      const favoriteIndex = oldFavorites.indexOf(id);
      const alreadyFavorite = favoriteIndex !== -1;

      if (action.type === ActionType.REMOVE_FAVORITE_MARKET) {
        if (alreadyFavorite) {
          oldFavorites.splice(favoriteIndex, 1);
        }
        return {
          ...state,
          favorites: oldFavorites
        };
      } else {
        const favorites = alreadyFavorite
          ? oldFavorites
          : [...oldFavorites, id];

        return {
          ...state,
          favorites
        };
      }
    }
  }

  return state;
}
