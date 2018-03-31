import * as React from 'react';
import { MarketWithContracts } from '../../../types/client';
import { MarketFilters } from '../../store';
import { memoize } from '../../utils';
import { MarketListItem } from '../market-list-item';
import { hasFilterHelper } from './has-filter-helper';
import {
  contentClass,
  marketCountClass,
  marketListClass
} from './market-list.styles';

const ITEMS_PER_PAGE = 10;

export interface MarketListProps {
  page: number;
  filter: number;
  markets: MarketWithContracts[];
  setPage(page: number): void;
}

export class MarketList extends React.PureComponent<MarketListProps> {
  public handleInfiniteScroll = () => {
    const body = document.body;
    if (body.scrollHeight - (body.scrollTop + 100) <= body.clientHeight) {
      const { setPage, page, markets } = this.props;
      const total = markets.length;
      const maxPage = Math.floor(total / ITEMS_PER_PAGE) + 1;
      if (page < maxPage) {
        setPage(page + 1);
      }
    }
  };

  public componentDidMount() {
    document.addEventListener('scroll', this.handleInfiniteScroll);
  }

  public componentWillUnmount() {
    document.removeEventListener('scroll', this.handleInfiniteScroll);
  }

  public render() {
    const { markets, filter, page = 1 } = this.props;
    const total = markets.length;
    const maxPage = Math.floor(total / ITEMS_PER_PAGE) + 1;
    const sliced = markets.slice(0, page * ITEMS_PER_PAGE);

    return (
      <div className={marketListClass}>
        <div className={contentClass}>
          <div className={marketCountClass}>
            ({total} relevant prediction markets)
          </div>
          {sliced.map(market => (
            <MarketListItem
              dateExtent={
                hasFilterHelper(filter, MarketFilters.SHARE_DATES)
                  ? getDateExtent(sliced)
                  : undefined
              }
              market={market}
              key={market.market_id}
            />
          ))}
        </div>
      </div>
    );
  }
}

function getDateExtent(markets: MarketWithContracts[]): [number, number] {
  let minDate = Infinity;
  let maxDate = -Infinity;
  for (const market of markets) {
    const [marketMin, marketMax] = getDateExtentForMarket(market);
    if (marketMin < minDate) { minDate = marketMin; }
    if (marketMax > maxDate) { maxDate = marketMax; }
  }

  return [minDate, maxDate];
}

const getDateExtentForMarket = memoize((market: MarketWithContracts) => {
  let minDate = Infinity;
  let maxDate = -Infinity;

  for (const contract of market.contracts) {
    const { start, maxDate: contractMaxDate } = contract.series;
    if (start < minDate) { minDate = start; }
    if (contractMaxDate > maxDate) { maxDate = contractMaxDate; }
  }

  const extent: [number, number] = [minDate, maxDate];

  return extent;
});
