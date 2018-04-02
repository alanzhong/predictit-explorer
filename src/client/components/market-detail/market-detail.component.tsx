import * as React from 'react';
import { MarketWithContracts } from '../../../types/client';
import { MarketDetailContract } from '../market-detail-contract';
import {
  marketDetailClass,
  marketDetailHeaderClass
} from './market-detail.styles';

export interface MarketDetailProps {
  market: MarketWithContracts | undefined;
}

export class MarketDetail extends React.PureComponent<MarketDetailProps> {
  render() {
    const { market } = this.props;
    if (!market) {
      return <div>No market found...</div>;
    }

    const multiContract = market.contracts.length > 1;

    return (
      <div className={marketDetailClass}>
        <h2 className={marketDetailHeaderClass}>{market.name}</h2>
        {market.contracts.map(contract => (
          <MarketDetailContract
            contract={contract}
            multiContract={multiContract}
            key={contract.contract_id}
          />
        ))}
      </div>
    );
  }
}
