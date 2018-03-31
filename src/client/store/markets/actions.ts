import { ClientData } from '../../../types/client';
import { ActionType } from '../action-types';
import { ThunkAction } from '../state';

export type MarketsAction =
  | UpdateMarketDataRequest
  | UpdateMarketDataSuccess
  | UpdateMarketDataFailure
  | AddFavoriteMarket
  | RemoveFavoriteMarket
  | SetFavoriteMarkets;

/**
 * issue request to update app data
 */
export const updateMarkets = (): ThunkAction => dispatch => {
  dispatch(updateMarketDataRequest());
  fetch(window.location.origin + '/data.json')
    .then(result => result.json())
    .then((data: ClientData) => {
      dispatch(updateMarketDataSuccess(data));
    })
    .catch(err => {
      console.log(err);
      dispatch(updateMarketDataFailure(err));
    });
};

interface UpdateMarketDataRequest {
  type: ActionType.UPDATE_MARKET_DATA_REQUEST;
}

const updateMarketDataRequest = (): UpdateMarketDataRequest => ({
  type: ActionType.UPDATE_MARKET_DATA_REQUEST
});

interface UpdateMarketDataSuccess {
  type: ActionType.UPDATE_MARKET_DATA_SUCCESS;
  payload: {
    data: ClientData;
  };
}

const updateMarketDataSuccess = (
  data: ClientData
): UpdateMarketDataSuccess => ({
  type: ActionType.UPDATE_MARKET_DATA_SUCCESS,
  payload: { data }
});

interface UpdateMarketDataFailure {
  type: ActionType.UPDATE_MARKET_DATA_FAILURE;
  payload: {
    message: string;
  };
}

const updateMarketDataFailure = (err: Error): UpdateMarketDataFailure => ({
  type: ActionType.UPDATE_MARKET_DATA_FAILURE,
  payload: { message: err.message }
});

interface AddFavoriteMarket {
  type: ActionType.ADD_FAVORITE_MARKET;
  payload: {
    id: number;
  };
}

export const addFavoriteMarket = (id: number): AddFavoriteMarket => ({
  type: ActionType.ADD_FAVORITE_MARKET,
  payload: { id }
});

interface RemoveFavoriteMarket {
  type: ActionType.REMOVE_FAVORITE_MARKET;
  payload: {
    id: number;
  };
}

export const removeFavoriteMarket = (id: number): RemoveFavoriteMarket => ({
  type: ActionType.REMOVE_FAVORITE_MARKET,
  payload: { id }
});

interface SetFavoriteMarkets {
  type: ActionType.SET_FAVORITE_MARKETS;
  payload: {
    ids: number[];
  };
}

export const setFavoriteMarkets = (ids: number[]): SetFavoriteMarkets => ({
  type: ActionType.SET_FAVORITE_MARKETS,
  payload: { ids }
});
