/* tslint:disable */
// these types come from predictit itself...

export namespace Predictit {
  export interface Contract {
    ID: number;
    DateEnd: string;
    Image: string;
    URL: string;
    Name: string;
    LongName: string;
    ShortName: string;
    TickerSymbol: string;
    Status: string;
    LastTradePrice: number | null;
    BestBuyYesCost: number | null;
    BestBuyNoCost: number | null;
    BestSellYesCost: number | null;
    BestSellNoCost: number | null;
    LastClosePrice: number | null;
  }

  export interface Market {
    ID: number;
    Name: string;
    ShortName: string;
    TickerSymbol: string;
    Image: string;
    URL: string;
    Contracts: Contract[];
    TimeStamp: string;
    Status: string;
  }

  export interface Result {
    Markets: Market[];
  }
}
