import * as React from 'react';
import { MarketWithContracts } from '../../../types/client';
import { FavoriteIcon } from '../icon';
import { MarketListItem } from '../market-list-item';
import { favoriteIconClass, favoriteListClass } from './favorite-list.styles';

export interface FavoriteListProps {
  markets: MarketWithContracts[];
}

export class FavoriteList extends React.PureComponent<FavoriteListProps> {
  render() {
    const { markets } = this.props;
    return (
      <div className={favoriteListClass}>
        <h2>Favorite Markets</h2>
        {!markets.length && (
          <div>
            You have no favorite markets, click on the{' '}
            <FavoriteIcon className={favoriteIconClass} /> on a market to have
            it appear here.
          </div>
        )}
        {markets.map(market => (
          <MarketListItem market={market} key={market.market_id} />
        ))}
      </div>
    );
  }
}
