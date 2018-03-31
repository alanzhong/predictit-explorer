import { Client } from 'pg';
import * as dbTypes from '../types/postgres';
import { Predictit } from '../types/predictit';
import { getDb } from './db';

/**
 * insert one or an array of predictit api results into a given postgres database
 *
 * does not open / close client connection
 */
export async function insert(
  result: Predictit.Result | Predictit.Result[],
  client: Client,
  options?: {
    verbose?: boolean;
    abort?: boolean;
  }
) {
  try {
    const { verbose = true, abort = false } = options || {};
    const log = (message: string) => verbose && console.log(message);

    log(`mapping data to observations...`);
    const { markets, contracts, observations } = resultToRows(result);

    log(`starting transaction...`);
    await client.query('BEGIN');

    log(`inserting markets...`);
    await insertMarkets(markets, client);

    log(`updating open status...`);
    await updateClosedMarkets(markets, client);

    log(`inserting contracts...`);
    await insertContracts(contracts, client);

    log(`inserting observations...`);
    await insertObservations(observations, client);

    if (abort) {
      log(`aborting...`);
      return client.query(`ROLLBACK`);
    }

    log(`ending transaction...`);
    await client.query('COMMIT');
  } catch (err) {
    console.log(`error, rolling back...`);
    await client.query('ROLLBACK');
    throw err;
  }
}

function get<O extends {}, K extends keyof O>(objs: O[], key: K) {
  return objs.map(o => {
    const v = o[key];
    return isDefined(v) ? v : null;
  });
}

/**
 * map a predictit api result into postgres rows
 */
function resultToRows(result: Predictit.Result | Predictit.Result[]) {
  const marketMap = new Map<number, dbTypes.market>();
  const contractMap = new Map<number, dbTypes.contract>();
  const dbObservations: dbTypes.observation[] = [];
  const markets = getMarkets(result);
  const now = utc();

  // iterate through market data in ascending date order,
  // overwriting market data as observed...
  for (const market of markets) {
    marketMap.set(market.ID, {
      market_id: market.ID,
      ticker_symbol: market.TickerSymbol,
      name: market.Name,
      short_name: market.ShortName,
      image: market.Image,
      url: market.URL,
      updated_date: now,
      created_date: now,
      is_open: true
    });

    for (const contract of market.Contracts) {
      contractMap.set(contract.ID, {
        contract_id: contract.ID,
        market_id: market.ID,
        image: contract.Image,
        url: contract.URL,
        ticker_symbol: contract.TickerSymbol,
        name: contract.Name,
        short_name: contract.ShortName,
        date_end: contract.DateEnd === 'N/A' ? null : utc(contract.DateEnd),
        updated_date: now,
        created_date: now
      });

      dbObservations.push({
        contract_id: contract.ID,
        buy_yes: toInt(contract.BestBuyYesCost),
        buy_no: toInt(contract.BestBuyNoCost),
        sell_no: toInt(contract.BestSellNoCost),
        sell_yes: toInt(contract.BestSellYesCost),
        last_close: toInt(contract.LastClosePrice),
        last_trade: toInt(contract.LastTradePrice),
        date: utc(market.TimeStamp)
      });
    }
  }

  return {
    markets: Array.from(marketMap.values()),
    contracts: Array.from(contractMap.values()),
    observations: dbObservations
  };
}

function toInt(n: number | null) {
  if (n === null) {
    return n;
  }
  return (n * 100) | 0;
}

function hashMarketResult(market: Predictit.Market) {
  return `${market.ID}-${market.TimeStamp}`;
}

function getMarkets(
  result: Predictit.Result | Predictit.Result[]
): Predictit.Market[] {
  const results = Array.isArray(result) ? result : [result];
  const markets: Predictit.Market[] = [];

  results.forEach(r => markets.push(...r.Markets));
  const unique = uniqueBy(markets, hashMarketResult);

  return unique.sort(sortByDate);
}

function sortByDate(
  marketA: Predictit.Market,
  marketB: Predictit.Market
): number {
  const a = new Date(marketA.TimeStamp).getTime();
  const b = new Date(marketB.TimeStamp).getTime();
  return a - b;
}

function utc(dateStr?: string) {
  return new Date(
    dateStr ? new Date(dateStr).toUTCString() : new Date().toUTCString()
  );
}

async function updateClosedMarkets(markets: dbTypes.market[], client: Client) {
  const ids = markets.map(market => market.market_id);
  await client.query(
    `
    update market
    set
      is_open = false
    where
      is_open = true and
      market_id != all($1::smallint[])
  `,
    [ids]
  );
}

/**
 *
 *
 * insert an array of markets into
 *
 *
 */
async function insertMarkets(markets: dbTypes.market[], client: Client) {
  const marketsQuery = `
    insert into market(
        market_id,
        ticker_symbol,
        name,
        short_name,
        image,
        url,
        is_open
      )
    select * from unnest(
        $1::smallint[],
        $2::text[],
        $3::text[],
        $4::text[],
        $5::text[],
        $6::text[],
        $7::boolean[]
      )
    on conflict(market_id) do
    update set
      name = excluded.name,
      short_name = excluded.short_name,
      image = excluded.image,
      url = excluded.url,
      updated_date = now(),
      is_open = excluded.is_open
  `;

  await client.query(marketsQuery, [
    get(markets, 'market_id'),
    get(markets, 'ticker_symbol'),
    get(markets, 'name'),
    get(markets, 'short_name'),
    get(markets, 'image'),
    get(markets, 'url'),
    markets.map(() => true)
  ]);
}

async function insertContracts(contracts: dbTypes.contract[], client: Client) {
  const contractsQuery = `
    insert into contract(
        contract_id,
        market_id,
        ticker_symbol,
        name,
        short_name,
        image,
        url,
        date_end
      )
    select * from unnest(
        $1::smallint[],
        $2::smallint[],
        $3::text[],
        $4::text[],
        $5::text[],
        $6::text[],
        $7::text[],
        $8::timestamp[]
      )
    on conflict(contract_id) do
    update set
      ticker_symbol = excluded.ticker_symbol,
      name = excluded.name,
      short_name = excluded.short_name,
      image = excluded.image,
      url = excluded.url,
      date_end = excluded.date_end,
      updated_date = now()
  `;

  await client.query(contractsQuery, [
    get(contracts, 'contract_id'),
    get(contracts, 'market_id'),
    get(contracts, 'ticker_symbol'),
    get(contracts, 'name'),
    get(contracts, 'short_name'),
    get(contracts, 'image'),
    get(contracts, 'url'),
    get(contracts, 'date_end')
  ]);
}

async function insertObservations(
  observations: dbTypes.observation[],
  client: Client
) {
  const contractsQuery = `
    insert into observation(
        contract_id,
        buy_yes,
        buy_no,
        sell_yes,
        sell_no,
        last_close,
        last_trade,
        date
      )
    select * from unnest(
        $1::smallint[],
        $2::smallint[],
        $3::smallint[],
        $4::smallint[],
        $5::smallint[],
        $6::smallint[],
        $7::smallint[],
        $8::timestamp[]
      )
    on conflict(contract_id, date) do
    update set
      buy_yes = excluded.buy_yes,
      buy_no = excluded.buy_no,
      sell_yes = excluded.sell_yes,
      sell_no = excluded.sell_no,
      last_close = excluded.last_close,
      last_trade = excluded.last_trade
  `;

  await client.query(contractsQuery, [
    get(observations, 'contract_id'),
    get(observations, 'buy_yes'),
    get(observations, 'buy_no'),
    get(observations, 'sell_yes'),
    get(observations, 'sell_no'),
    get(observations, 'last_close'),
    get(observations, 'last_trade'),
    get(observations, 'date')
  ]);
}

function isDefined<T>(val: T | null | undefined): val is T {
  return typeof val !== 'undefined' && val !== null;
}

function uniqueBy<T extends {}>(arr: T[], getId: (obj: T) => string) {
  const seen = new Set<string>();
  const out = [];

  for (const obj of arr) {
    const id = getId(obj);
    if (!seen.has(id)) {
      seen.add(id);
      out.push(obj);
    }
  }

  return out;
}
