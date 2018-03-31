import { S3Handler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { gunzip } from 'zlib';
import { Predictit } from '../../../types/predictit';
import { getDb } from '../../postgres/db';
import { insert } from '../../postgres/insert';
import * as CONSTANTS from '../constants';

/**
 * insert observations into postgres from an api response that was inserted into S3
 */
export const handler: S3Handler = async (event, context, callback) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;

    const s3 = new S3();
    const srcBucket = event.Records[0].s3.bucket.name;
    const srcKey = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, ' ')
    );

    if (!srcKey.startsWith(CONSTANTS.RAW_DATA_PREFIX)) {
      console.log(
        `Object not from ${CONSTANTS.RAW_DATA_PREFIX} folder, ending.`
      );
      return callback();
    }

    console.log(`retrieving object from s3...`);
    const [response, db] = await Promise.all([
      s3
        .getObject({
          Bucket: srcBucket,
          Key: srcKey
        })
        .promise(),
      getDb()
    ]);

    const body = response.Body;
    if (!body) {
      return callback();
    }

    console.log(`unzipping data...`);
    const data = await new Promise<Predictit.Result>((res, rej) => {
      gunzip(body as Buffer, (err, result) => {
        if (err) {
          return rej(err);
        }
        res(JSON.parse(result.toString()));
      });
    });

    console.log(`inserting data...`);
    await db.connect();
    await insert(data, db);
    await db.end();
    console.log(`insert complete!`);

    callback();
  } catch (err) {
    console.log(`Error: ${err.message}`);
    callback(err);
  }
};
