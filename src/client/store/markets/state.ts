import {
  ClientData,
  ContractWithSeries,
  MarketWithContracts
} from '../../../types/client';

export interface MarketsState {
  data?: ClientData;
  lookup?: {
    byMarketId: { [key: string]: number };
    byMarketTicker: { [key: string]: number };
    byMarketNameFormatted: { [key: string]: number };
    contractsById: { [key: number]: number };
  };
  contracts?: ContractWithSeries[];
  requesting?: boolean;
  favorites?: number[];
}
