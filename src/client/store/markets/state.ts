import { ClientData, MarketWithContracts } from '../../../types/client';

export interface MarketsState {
  data?: ClientData;
  lookup?: {
    byMarketId: { [key: string]: number };
    byMarketTicker: { [key: string]: number };
    byMarketNameFormatted: { [key: string]: number };
  };
  requesting?: boolean;
  favorites?: number[];
}
