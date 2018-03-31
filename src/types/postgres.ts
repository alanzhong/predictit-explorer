/* tslint:disable */

export namespace observationFields {
  export type contract_id = number;
  export type buy_yes = number | null;
  export type buy_no = number | null;
  export type sell_yes = number | null;
  export type sell_no = number | null;
  export type last_close = number | null;
  export type last_trade = number | null;
  export type date = Date;
}

export interface observation {
  contract_id: observationFields.contract_id;
  buy_yes: observationFields.buy_yes;
  buy_no: observationFields.buy_no;
  sell_yes: observationFields.sell_yes;
  sell_no: observationFields.sell_no;
  last_close: observationFields.last_close;
  last_trade: observationFields.last_trade;
  date: observationFields.date;
}

export namespace observation_dayFields {
  export type contract_id = number;
  export type buy_yes = number | null;
  export type buy_no = number | null;
  export type sell_yes = number | null;
  export type sell_no = number | null;
  export type last_close = number | null;
  export type last_trade = number | null;
  export type day = Date;
}

export interface observation_day {
  contract_id: observation_dayFields.contract_id;
  buy_yes: observation_dayFields.buy_yes;
  buy_no: observation_dayFields.buy_no;
  sell_yes: observation_dayFields.sell_yes;
  sell_no: observation_dayFields.sell_no;
  last_close: observation_dayFields.last_close;
  last_trade: observation_dayFields.last_trade;
  day: observation_dayFields.day;
}

export namespace observation_hourFields {
  export type contract_id = number;
  export type buy_yes = number | null;
  export type buy_no = number | null;
  export type sell_yes = number | null;
  export type sell_no = number | null;
  export type last_close = number | null;
  export type last_trade = number | null;
  export type hour = Date;
}

export interface observation_hour {
  contract_id: observation_hourFields.contract_id;
  buy_yes: observation_hourFields.buy_yes;
  buy_no: observation_hourFields.buy_no;
  sell_yes: observation_hourFields.sell_yes;
  sell_no: observation_hourFields.sell_no;
  last_close: observation_hourFields.last_close;
  last_trade: observation_hourFields.last_trade;
  hour: observation_hourFields.hour;
}

export namespace marketFields {
  export type market_id = number;
  export type ticker_symbol = string;
  export type name = string;
  export type short_name = string;
  export type image = string;
  export type url = string;
  export type updated_date = Date | null;
  export type created_date = Date | null;
  export type is_open = boolean;
}

export interface market {
  market_id: marketFields.market_id;
  ticker_symbol: marketFields.ticker_symbol;
  name: marketFields.name;
  short_name: marketFields.short_name;
  image: marketFields.image;
  url: marketFields.url;
  updated_date: marketFields.updated_date;
  created_date: marketFields.created_date;
  is_open: marketFields.is_open;
}

export namespace contractFields {
  export type contract_id = number;
  export type market_id = number;
  export type ticker_symbol = string;
  export type name = string;
  export type short_name = string;
  export type image = string;
  export type url = string;
  export type date_end = Date | null;
  export type updated_date = Date | null;
  export type created_date = Date | null;
}

export interface contract {
  contract_id: contractFields.contract_id;
  market_id: contractFields.market_id;
  ticker_symbol: contractFields.ticker_symbol;
  name: contractFields.name;
  short_name: contractFields.short_name;
  image: contractFields.image;
  url: contractFields.url;
  date_end: contractFields.date_end;
  updated_date: contractFields.updated_date;
  created_date: contractFields.created_date;
}
