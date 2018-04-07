import * as React from 'react';
import { ContractWithSeries } from '../../../types/client';
import { kebab } from '../../utils';
import { Chart } from '../chart';
import { ContractChange } from '../contract-change';
import {
  marketDetailChartClass,
  marketDetailContractClass,
  marketDetailContractHeaderClass,
  marketDetailContractInfo
} from './market-detail-contract.styles';

export interface MarketDetailContractProps {
  contract: ContractWithSeries;
  multiContract?: boolean;
}

export class MarketDetailContract extends React.PureComponent<
  MarketDetailContractProps
> {
  render() {
    const { contract, multiContract } = this.props;

    return (
      <div className={marketDetailContractClass}>
        {multiContract && (
          <div className={marketDetailContractInfo}>
            <h3
              id={kebab(contract.name)}
              className={marketDetailContractHeaderClass}
            >
              {contract.name}
            </h3>
            <ContractChange contractId={contract.contract_id} />
          </div>
        )}
        <Chart className={marketDetailChartClass} series={contract.series} />
      </div>
    );
  }
}
