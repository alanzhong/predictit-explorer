import Fuse, { TextMatch } from 'fuse-virtual';
import { MarketWithContracts } from '../../../types/client';
import { memoize } from '../../utils';

export interface SearchResult {
  item: MarketWithContracts;
  matches: TextMatch[];
}

export function search(
  markets: MarketWithContracts[],
  query: string
): MarketWithContracts[] {
  return getIndex(markets).search<MarketWithContracts>(query);
}

const getIndex = memoize((markets: MarketWithContracts[]) => {
  return new Fuse(markets, {
    includeMatches: false,
    includeScore: false,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: ['name']
  });
});
