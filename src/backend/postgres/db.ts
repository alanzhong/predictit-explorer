import { Client } from 'pg';
import postgresConfig from '../../secret';

export async function getDb() {
  const client = new Client({
    ...postgresConfig
  });
  return client;
}
