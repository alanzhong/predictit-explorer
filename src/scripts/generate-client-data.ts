import { writeFileSync } from 'fs';
import { getClientData } from '../backend/postgres/client-data';

getClientData()
  .then(result => {
    writeFileSync('./data/result.json', JSON.stringify(result));
    process.exit(0);
  })
  .catch(err => console.log(err));
