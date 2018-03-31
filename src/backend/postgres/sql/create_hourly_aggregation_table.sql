/**
    Hourly aggregation table
 */

create table if not exists observation_hour as select
    contract_id,
    avg(buy_yes) as buy_yes,
    avg(buy_no) as buy_no,
    avg(sell_yes) as sell_yes,
    avg(sell_no) as sell_no,
    avg(last_close) as last_close,
    avg(last_trade) as last_trade,
    date_trunc('hour', date) as hour
  from observation
  group by contract_id, hour
  order by contract_id, hour;

alter table only observation_hour
    add constraint observation_hour_pkey primary key (contract_id, hour);

create index on observation_hour using btree (hour);