import * as fs from 'fs';
import { getHtmlString } from '../client/html';

const prod = process.env.NODE_ENV === 'production';

if (prod) {
  const js = fs.readFileSync('./public/bundle.js').toString();
  fs.writeFileSync('./public/index.html', getHtmlString(js));
} else {
  fs.writeFileSync('./public/index.html', getHtmlString());
}

fs
  .createReadStream('./data/result.json')
  .pipe(fs.createWriteStream('./public/data.json'));
