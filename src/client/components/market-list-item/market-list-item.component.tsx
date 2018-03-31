import * as React from 'react';
import { classes } from 'typestyle';
import { ContractWithSeries, MarketWithContracts } from '../../../types/client';
import { last, memoize, stringToUrl } from '../../utils';
import { Chart } from '../chart';
import { Colors } from '../colors';
import { Favorite } from '../favorite';
import { ActiveIcon, MultiContractIcon } from '../icon';
import { Tooltip } from '../tooltip';
import {
  contractNameClass,
  indicatorClass,
  indicatorContainerClass,
  marketListItemClass,
  marketListItemHeaderClass,
  marketNameClass,
  outlineClass,
  showAllContractsButtonClass,
  showAllContractsClass,
  sparkLineClass,
  sparkLineContainer
} from './market-list-item.styles';

export interface MarketListItemProps {
  market: MarketWithContracts;
  dateExtent?: [number, number];
  goToMarket(market: MarketWithContracts): void;
}

export interface MarketListItemState {
  expanded?: boolean;
}

export class MarketListItem extends React.PureComponent<
  MarketListItemProps,
  MarketListItemState
> {
  public state: MarketListItemState = {};

  public toggleExpanded = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    this.setState({ expanded: !this.state.expanded });
  };

  public onClick = () => {
    const { market, goToMarket } = this.props;
    goToMarket(market);
  };

  public render() {
    const { market, dateExtent } = this.props;
    const { expanded } = this.state;
    const { contracts, is_open } = market;

    const multipleContracts = contracts.length > 1;
    const sorted = getSortedContracts(contracts);
    const sliced = expanded ? sorted : sorted.slice(0, 1);

    return (
      <div className={marketListItemClass} onClick={this.onClick}>
        <div className={marketListItemHeaderClass}>
          <div className={marketNameClass}>{market.name}</div>
          <div className={indicatorContainerClass}>
            {multipleContracts && (
              <Tooltip text="Multi-contract market">
                <MultiContractIcon
                  className={indicatorClass}
                  style={{
                    fill: Colors.DARK_GRAY
                  }}
                />
              </Tooltip>
            )}
            {is_open && (
              <Tooltip text="Market is active">
                <ActiveIcon
                  className={indicatorClass}
                  style={{
                    fill: Colors.DARK_GRAY
                  }}
                />
              </Tooltip>
            )}
            <Favorite id={market.market_id} className={indicatorClass} />
          </div>
        </div>
        {sliced.map(contract => (
          <div className={sparkLineContainer} key={contract.contract_id}>
            {multipleContracts && (
              <div className={contractNameClass}>{contract.name}</div>
            )}
            <Chart
              className={sparkLineClass}
              dateExtent={dateExtent}
              series={contract.series}
            />
          </div>
        ))}

        {multipleContracts && (
          <div className={showAllContractsClass}>
            <button
              className={classes(outlineClass, showAllContractsButtonClass)}
              onClick={this.toggleExpanded}
            >
              show {expanded ? 'fewer' : 'more'} options
            </button>
          </div>
        )}
      </div>
    );
  }
}

const getSortedContracts = memoize((contracts: ContractWithSeries[]) => {
  return contracts.sort(sortByMaxLastValue);
});

function sortByMaxLastValue(aC: ContractWithSeries, bC: ContractWithSeries) {
  const a = Number(last(aC.series.series)![0]);
  const b = Number(last(bC.series.series)![0]);

  return b - a;
}