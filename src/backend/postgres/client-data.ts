import { Client } from 'pg';
import {
  ClientContract,
  ClientData,
  ClientMarket,
  CompressedSeries,
  ContractWithSeries,
  DailySeriesResult,
  MarketWithContracts,
  ProjectedDailyResult
} from '../../types/client';
import * as tables from '../../types/postgres';
import { getDb } from './db';

interface DailyResultRow {
  last_trade: string;
  day: Date;
  contract_id: number;
}
/**
 *
 * get all data used by client app
 *
 */
export async function getClientData(): Promise<ClientData> {
  console.log(`connecting to db...`);
  const db = await getDb();
  await db.connect();

  console.log(`retrieving market data...`);
  const markets = await getMarkets(db);

  console.log(`closing db connection...`);
  await db.end();
  return {
    markets,
    updatedAt: new Date().getTime()
  };
}

/**
 *
 * retrieves all contracts + markets from db
 *
 */
async function getMarkets(client: Client) {
  console.log(`getting daily observations...`);
  const observations = await getDailyObservations(client);

  console.log(`getting market metadata...`);
  const [marketResult, contractResult] = await Promise.all([
    client.query(
      'select market_id, ticker_symbol, name, url, is_open from market'
    ),
    client.query('select contract_id, name, market_id, date_end from contract')
  ]);

  console.log(`formatting data...`);

  interface ContractHash {
    [marketId: string]: ContractWithSeries[];
  }

  const contractsByMarket: ContractHash = contractResult.rows.reduce(
    (out: ContractHash, contract: ClientContract) => {
      if (!out[contract.market_id]) {
        out[contract.market_id] = [];
      }

      out[contract.market_id].push({
        ...contract,
        series: observations[contract.contract_id]
      });

      return out;
    },
    {}
  );

  console.log(`filtering data...`);

  const markets: MarketWithContracts[] = marketResult.rows
    .map((market: ClientMarket) => {
      const contracts = contractsByMarket[market.market_id];

      return {
        ...market,
        contracts,
        maxDate: getMaxMarketDataDate(contracts)
      };
    })
    .filter(market =>
      market.contracts.some(contract => contract.series.series.length > 1)
    );

  console.log(`sorting data...`);

  return markets.sort(sortByMaxDates);
}

function sortByMaxDates(a: MarketWithContracts, b: MarketWithContracts) {
  return b.maxDate - a.maxDate;
}

function getMaxMarketDataDate(contracts: ContractWithSeries[]) {
  let max = -Infinity;

  for (const contract of contracts) {
    const { maxDate } = contract.series;
    if (maxDate > max) {
      max = maxDate;
    }
  }

  return max;
}

/**
 *
 * retrieves and compresses daily aggregation series
 *
 */
async function getDailyObservations(
  client: Client
): Promise<ProjectedDailyResult> {
  const dailyObservationResult = await client.query(`
    select contract_id,
          round(last_trade, 2) as last_trade,
          day
      from observation_day
      order by contract_id, day
  `);

  const rows: DailyResultRow[] = dailyObservationResult.rows;
  rows.sort(sortObservationsByDate);

  const byContractId = rows.reduce(
    (result, obs) => {
      if (!(obs.contract_id in result)) {
        result[obs.contract_id] = [];
      }
      result[obs.contract_id].push(obs);
      return result;
    },
    {} as { [contractId: string]: DailyResultRow[] }
  );

  const out: ProjectedDailyResult = {};

  const contractIds = Object.keys(byContractId);
  for (const contractId of contractIds) {
    const observations = byContractId[contractId];
    const series: CompressedSeries[] = [];

    let current = Infinity;
    let start = Infinity;
    let maxDate = -Infinity;

    for (const obs of observations) {
      const value = obs.last_trade;
      const time = new Date(obs.day.toString()).getTime();

      if (time > maxDate) {
        maxDate = time;
      }

      if (start === Infinity) {
        current = start = time;
      }

      if (value) {
        series.push([value, Math.round(time - current!)]);
        current = time;
      }
    }

    out[contractId] = { start, maxDate, series };
  }

  return out;
}

/**
 *
 * sort rows by time
 *
 */
function sortObservationsByDate(aRow: DailyResultRow, bRow: DailyResultRow) {
  const a = new Date(aRow.day.toString()).getTime();
  const b = new Date(bRow.day.toString()).getTime();
  return a - b;
}
