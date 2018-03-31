import * as React from 'react';
import { ContractWithSeries } from '../../../types/client';
import { stringToUrl } from '../../utils';
import { Chart } from '../chart';
import {
  marketDetailChartClass,
  marketDetailContractClass
} from './market-detail-contract.styles';

export interface MarketDetailContractProps {
  contract: ContractWithSeries;
  multiContract?: boolean;
}

export class MarketDetailContract extends React.PureComponent<
  MarketDetailContractProps
> {
  public render() {
    const { contract, multiContract } = this.props;

    return (
      <div className={marketDetailContractClass}>
        {multiContract && (
          <h3 id={stringToUrl(contract.name)}>{contract.name}</h3>
        )}
        <Chart className={marketDetailChartClass} series={contract.series} />
      </div>
    );
  }
}
