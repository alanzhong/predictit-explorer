import { ScheduledHandler } from 'aws-lambda'; // tslint:disable-line
import * as AWS from 'aws-sdk';
import * as zlib from 'zlib';
import { ClientData } from '../../../types/client';
import { getClientData } from '../../postgres/client-data';
import * as CONSTANTS from '../constants';

const s3 = new AWS.S3();
const sns = new AWS.SNS({ region: 'us-east-1' });

/**
 * generate data for client, write JSON file to s3
 */
export const handler: ScheduledHandler = async (event, context, callback) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    await dumpClientDataToS3();
    callback();
  } catch (err) {
    callback(err);
  }
};

export async function dumpClientDataToS3() {
  console.log(`preparing data...`);
  const data = await getClientData();
  console.log(`uploading to s3...`);
  await uploadJson(data, 'data.json');
  console.log(`done!`);
}

/**
 * Upload client data to s3
 */
function uploadJson(
  data: ClientData,
  filename: string,
  bucket = CONSTANTS.CLIENT_BUCKET
) {
  return new Promise((res, rej) => {
    zlib.gzip(new Buffer(JSON.stringify(data)), (zipErr, zipped) => {
      if (zipErr) {
        return rej(zipErr);
      }

      s3
        .upload({
          Body: zipped,
          Bucket: bucket,
          CacheControl: 'max-age=300',
          ContentEncoding: 'gzip',
          Key: filename
        })
        .promise()
        .then(res)
        .catch(rej);
    });
  });
}
