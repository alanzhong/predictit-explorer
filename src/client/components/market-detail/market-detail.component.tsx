import * as React from 'react';
import { MarketWithContracts } from '../../../types/client';
import { ContractChange } from '../contract-change';
import { MarketDetailContract } from '../market-detail-contract';
import {
  marketDetailClass,
  marketDetailHeaderClass,
  marketDetailInfoClass
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
    const { contracts } = market;
    const multiContract = contracts.length > 1;
    const first = contracts[0];

    return (
      <div className={marketDetailClass}>
        <div className={marketDetailInfoClass}>
          <h2 className={marketDetailHeaderClass}>
            <a href={market.url} target="_blank">
              {market.name}
            </a>
          </h2>
          {!multiContract && <ContractChange contractId={first.contract_id} />}
        </div>

        {contracts.map(contract => (
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
