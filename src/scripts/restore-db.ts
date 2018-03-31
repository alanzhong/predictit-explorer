import { readdirSync, readFile } from 'fs';
import { join } from 'path';
import { gunzip } from 'zlib';
import { RAW_DATA_BUCKET, RAW_DATA_PREFIX } from '../backend/lambda/constants';
import { getDb } from '../backend/postgres/db';
import { insert } from '../backend/postgres/insert';
import { Predictit } from '../types/predictit';

const LOCAL_DATA_CACHE = './data/dump/';
const SKIP = 35100;

restore().catch(err => console.log(err));

async function restore() {
  const files = readdirSync(LOCAL_DATA_CACHE);
  const db = await getDb();
  await db.connect();

  const total = files.length;
  let count = SKIP;
  files.splice(0, SKIP);

  while (files.length) {
    const batch = files.splice(0, 100);
    const data = await Promise.all(batch.map(load));
    await insert(data, db, { verbose: false });
    await sleep(100);
    count += batch.length;
    console.log(`inserted ${count}/${total} ...`);
  }

  await db.end();
}

function load(fileName: string) {
  return new Promise<Predictit.Result>((res, rej) => {
    readFile(join(LOCAL_DATA_CACHE, fileName), (err, buff) => {
      gunzip(buff, (gzipErr, result) => {
        if (gzipErr) {
          return rej(err);
        }
        res(JSON.parse(result.toString()));
      });
    });
  });
}

function sleep(n: number) {
  return new Promise(res => setTimeout(res, n));
}
