import { getDb } from '../backend/postgres/db';
import { insert } from '../backend/postgres/insert';

(async () => {
  const data = require('../../data/predictit-dump-1498006099245.json');
  const db = await getDb();
  await db.connect();
  await insert(data, db, { abort: true, verbose: true });
  await db.end();
})().catch(err => console.log(err));
