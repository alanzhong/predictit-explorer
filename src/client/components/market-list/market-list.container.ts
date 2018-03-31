import { connect } from 'react-redux';
import { MarketWithContracts } from '../../../types/client';
import {
  Dispatch,
  getFilter,
  getMarketList,
  getPage,
  getSearchQuery,
  getShowFilters,
  MarketFilters,
  setPage,
  setShowFilters,
  State
} from '../../store';
import { debounce, memoize, pick } from '../../utils';
import { hasFilterHelper } from './has-filter-helper';
import { MarketList as MarketListComponent } from './market-list.component';
import { search } from './search';

function getFilteredMarkets(state: State) {
  const query = getSearchQuery(state);
  const allMarkets = getMarketList(state);
  const filter = getFilter(state);

  const markets = query ? search(allMarkets, query) : allMarkets;
  const hideInactive = hasFilterHelper(filter, MarketFilters.HIDE_INACTIVE);
  const hideMultiContract = hasFilterHelper(
    filter,
    MarketFilters.HIDE_MULTI_CONTRACT
  );

  return markets.filter(market => {
    if (hideInactive && !market.is_open) {
      return false;
    }
    if (hideMultiContract && market.contracts.length > 1) {
      return false;
    }

    return true;
  });
}

function mapStateToProps(state: State) {
  const page = getPage(state);
  const markets = getFilteredMarkets(state);
  const filter = getFilter(state);

  return { page, markets, filter };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setPage(page: number) {
      dispatch(setPage(page));
    }
  };
}

export const MarketList = connect(mapStateToProps, mapDispatchToProps)(
  MarketListComponent
);
