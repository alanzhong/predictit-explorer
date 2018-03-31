import { connect } from 'react-redux';
import { MarketWithContracts } from '../../../types/client';
import { getMarketList, getMinimumDataDate, State } from '../../store';
import { memoize } from '../../utils';
import { About as AboutComponent } from './about.component';

const getExampleMarket = memoize((markets: MarketWithContracts[]) => {
  for (const market of markets) {
    if (market.market_id === 3455) {
      return market;
    }
  }
});

function mapStateToProps(state: State) {
  return {
    minDate: getMinimumDataDate(state),
    exampleMarket: getExampleMarket(getMarketList(state))
  };
}

export const About = connect(mapStateToProps)(AboutComponent);
