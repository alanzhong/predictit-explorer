import * as React from 'react';
import { classes } from 'typestyle';
import { MarketWithContracts } from '../../../types/client';
import { ContractChange } from '../contract-change';
import { MarketDetailContract } from '../market-detail-contract';
import { Tooltip } from '../tooltip';
import {
  marketDetailClass,
  marketDetailHeaderClass,
  marketDetailInfoClass,
  marketDetailTableClass
} from './market-detail.styles';

export interface MarketDetailProps {
  market: MarketWithContracts | undefined;
  minDate: number;
}

export class MarketDetail extends React.PureComponent<MarketDetailProps> {
  render() {
    const { market, minDate } = this.props;

    if (!market) {
      return <div>No market found...</div>;
    }

    const { contracts } = market;
    const multiContract = contracts.length > 1;
    const first = contracts[0];
    const endDate = first.date_end;
    const start = first.series.start;
    const missingData = start === minDate;
    const startDate = new Date(start);

    return (
      <div className={marketDetailClass}>
        <div className={marketDetailInfoClass}>
          <h2 className={marketDetailHeaderClass}>
            <a href={market.url} target="_blank">
              {market.name}
            </a>
          </h2>
        </div>

        <table className={marketDetailTableClass}>
          <tbody>
            {!multiContract && (
              <tr>
                <td>Change: </td>
                <td>
                  <ContractChange contractId={first.contract_id} />
                </td>
              </tr>
            )}
            <tr>
              <td>Active: </td>
              <td>{market.is_open ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Start Date:</td>
              <td>
                {startDate.toLocaleDateString()}
                {missingData && (
                  <Tooltip text="Data collection started after market began">
                    <sup>1</sup>
                  </Tooltip>
                )}
              </td>
            </tr>
            <tr>
              <td>End Date: </td>
              <td>
                {endDate
                  ? new Date(endDate.toString()).toLocaleDateString()
                  : '(not applicable)'}
              </td>
            </tr>
            <tr>
              <td>Ticker: </td>
              <td>{market.ticker_symbol}</td>
            </tr>
          </tbody>
        </table>

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
