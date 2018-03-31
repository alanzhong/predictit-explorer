import { getDb } from './db';

/**
 *
 * In order to keep things cheap + snappy,
 * we pre-compute hourly and daily aggregations
 * as materialized views.
 *
 * The aggregations get refreshed every 5 minutes as new data comes in...
 *
 */

const HOURLY_QUERY = `
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
`;

const DAILY_QUERY = `
insert into observation_day select
    contract_id,
    avg(buy_yes) as buy_yes,
    avg(buy_no) as buy_no,
    avg(sell_yes) as sell_yes,
    avg(sell_no) as sell_no,
    avg(last_close) as last_close,
    avg(last_trade) as last_trade,
    date_trunc('day', hour) as day
  from observation_hour
  where hour >= date_trunc('day', now() - interval '2 days')
  group by contract_id, day
  order by contract_id, day
  on conflict(contract_id, day) do
    update set
       buy_yes = excluded.buy_yes,
       buy_no = excluded.buy_no,
       sell_yes = excluded.sell_yes,
       sell_no = excluded.sell_no,
       last_close = excluded.last_close,
       last_trade = excluded.last_trade;
`;

export async function updateAggregations() {
  const db = await getDb();

  console.log(`connecting...`);
  await db.connect();

  console.log(`updating hourly aggregations...`);
  await db.query(HOURLY_QUERY);

  console.log(`updating daily aggregations...`);
  await db.query(DAILY_QUERY);

  console.log(`disconnecting...`);
  await db.end();

  console.log(`done!`);
}
