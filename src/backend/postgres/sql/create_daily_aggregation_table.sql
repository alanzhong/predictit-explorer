/**
    Daily aggregation table
 */

create table if not exists observation_day as select
    contract_id,
    avg(buy_yes) as buy_yes,
    avg(buy_no) as buy_no,
    avg(sell_yes) as sell_yes,
    avg(sell_no) as sell_no,
    avg(last_close) as last_close,
    avg(last_trade) as last_trade,
    date_trunc('day', hour) as day
  from observation_hour
  group by contract_id, day
  order by contract_id, day;

alter table only observation_day
    add constraint observation_day_pkey primary key (contract_id, day);

create index on observation_day using btree (day);