import { connect } from 'react-redux';
import {
  getMarket,
  getMinimumDataDate,
  getRouter,
  RouterPaths,
  State
} from '../../store';
import { MarketDetail as MarketDetailComponent } from './market-detail.component';

function mapStateToProps(state: State) {
  const path = getRouter(state);
  const id = path.params ? path.params.marketId : '';

  return {
    minDate: getMinimumDataDate(state),
    market: getMarket(state, id)
  };
}

export const MarketDetail = connect(mapStateToProps)(MarketDetailComponent);
