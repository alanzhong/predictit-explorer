import * as tables from './postgres';

export interface ClientData {
  markets: MarketWithContracts[];
  updatedAt: number;
}

export type ClientContract = Pick<
  tables.contract,
  'contract_id' | 'name' | 'market_id' | 'date_end'
>;

export type ContractWithSeries = {
  series: DailySeriesResult;
} & ClientContract;

export type ClientMarket = Pick<
  tables.market,
  'market_id' | 'ticker_symbol' | 'name' | 'url' | 'is_open'
>;

export type MarketWithContracts = {
  contracts: ContractWithSeries[];
  maxDate: number;
} & ClientMarket;

export type CompressedSeries = [string, number];

export interface DailySeriesResult {
  start: number;
  maxDate: number;
  series: CompressedSeries[];
}

export interface ProjectedDailyResult {
  [contractId: string]: DailySeriesResult;
}

export interface ChartObservation {
  date: Date;
  value: number;
}
