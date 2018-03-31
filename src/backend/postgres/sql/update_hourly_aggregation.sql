/**
 * update hourly aggregation
 */
insert into observation_hour select
    contract_id,
    avg(buy_yes) as buy_yes,
    avg(buy_no) as buy_no,
    avg(sell_yes) as sell_yes,
    avg(sell_no) as sell_no,
    avg(last_close) as last_close,
    avg(last_trade) as last_trade,
    date_trunc('hour', date) as hour
  from observation
  where date >= date_trunc('hour', now() - interval '5 hours')
  group by contract_id, hour
  order by contract_id, hour
  on conflict(contract_id, hour) do
    update set
       buy_yes = excluded.buy_yes,
       buy_no = excluded.buy_no,
       sell_yes = excluded.sell_yes,
       sell_no = excluded.sell_no,
       last_close = excluded.last_close,
       last_trade = excluded.last_trade;