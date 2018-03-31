import { writeFileSync } from 'fs';
import { typescriptOfSchema } from 'schemats';
import postgresConfig from '../secret';

if (require.main === module) {
  generateTypes()
    .then(() => {
      process.exit(0);
    })
    .catch(err => console.error(err));
}

/**
 * generate typescript definitions from schema
 */
export async function generateTypes() {
  const { host, user, password, database } = postgresConfig;
  const db = `postgresql://${user}:${password}@${host}/${database}`;
  const result = await typescriptOfSchema(db, [], null, { writeHeader: false });
  writeFileSync('./src/types/postgres.ts', result);
}
