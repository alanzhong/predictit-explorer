import { connect } from 'react-redux';
import { push } from 'redux-little-router';
import { ContractWithSeries, MarketWithContracts } from '../../../types/client';
import { last, memoize, stringToUrl } from '../../utils';
import { MarketListItem as MarketListItemComponent } from './market-list-item.component';

import { Dispatch, RouterPaths } from '../../store';

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    goToMarket(market: MarketWithContracts) {
      dispatch(
        push(RouterPaths.MARKET.replace(':marketId', stringToUrl(market.name)))
      );
    }
  };
}

export const MarketListItem = connect(null, mapDispatchToProps)(
  MarketListItemComponent
);
