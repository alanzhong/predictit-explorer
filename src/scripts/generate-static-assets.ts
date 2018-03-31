import * as fs from 'fs';
import { getHtmlString } from '../client/html';

fs.writeFileSync('./public/index.html', getHtmlString());
fs
  .createReadStream('./data/result.json')
  .pipe(fs.createWriteStream('./public/data.json'));
