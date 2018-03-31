import { MarketFilters } from '../../store';

export function hasFilterHelper(filter: number, mask: MarketFilters) {
  return Boolean(filter & mask);
}
