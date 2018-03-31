create table if not exists market
  (
    market_id smallint primary key,
    ticker_symbol text not null,
    name text not null,
    short_name text not null,
    image text not null,
    url text not null,
    is_open boolean not null default false,
    updated_date timestamp default current_timestamp,
    created_date timestamp default current_timestamp
  );

create table if not exists contract
  (
    contract_id smallint primary key,
    market_id smallint references market(market_id) not null,
    ticker_symbol text not null,
    name text not null,
    short_name text not null,
    image text not null,
    url text not null,
    date_end timestamp without time zone null,
    updated_date timestamp default current_timestamp,
    created_date timestamp default current_timestamp
  );

create table if not exists observation
  (
    contract_id smallint references contract(contract_id) not null,
    buy_yes smallint null,
    buy_no smallint null,
    sell_yes smallint null,
    sell_no smallint null,
    last_close smallint null,
    last_trade smallint null,
    date timestamp without time zone not null,
    primary key(contract_id, date)
  );
