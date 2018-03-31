import { ScheduledHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as zlib from 'zlib';
import { Predictit } from '../../../types/predictit';
import { validate } from '../../schemas/validate';
import * as CONSTANTS from '../constants';

// https://github.com/rollup/rollup/issues/1267
const got = require('got'); // tslint:disable-line

const s3 = new AWS.S3();
const sns = new AWS.SNS({ region: 'us-east-1' });

export const handler: ScheduledHandler = async (event, context, callback) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    await poll();
    callback();
  } catch (err) {
    callback(err);
  }
};

/**
 * ping the predictit api and dump the result to s3
 */
async function poll(opts?: {
  bucket?: string;
  endpoint?: string;
  prefix?: string;
}) {
  const options = {
    bucket: CONSTANTS.RAW_DATA_BUCKET,
    endpoint: CONSTANTS.PREDICTIT_API_URL,
    prefix: '',
    ...opts
  };

  const data = await getJson<Predictit.Result>(options.endpoint);
  const valid = validate(data);

  /**
   * ensure data is conforming to expected schema
   */
  if (!valid) {
    console.log(`Schema failed validation: `);
    console.log(JSON.stringify(validate.errors, null, 2));

    const message = {
      Subject: 'Predictit api failed schema validation',
      Message: `Errors: \n ${JSON.stringify(validate.errors, null, 2)}`,
      TopicArn:
        'arn:aws:sns:us-east-1:377907674643:bsouthga-predictit-poll-invalid-schema'
    };

    await uploadJson(data, options.bucket, options.prefix + 'invalid/');
    console.log(
      `successful upload (invalid schema) to bucket ${
        options.bucket
      } at ${new Date().toISOString()}`
    );

    await sns.publish(message).promise();
  } else {
    await uploadJson(data, options.bucket, options.prefix);
    console.log(
      `successful upload to bucket ${
        options.bucket
      } at ${new Date().toISOString()}`
    );
  }
}

/**
 * Upload an api result to s3
 *
 * @param data raw data
 */
function uploadJson(
  data: Predictit.Result,
  bucket = CONSTANTS.RAW_DATA_BUCKET,
  prefix = ''
) {
  return new Promise((res, rej) => {
    zlib.gzip(new Buffer(JSON.stringify(data)), (zipErr, zipped) => {
      if (zipErr) {
        return rej(zipErr);
      }

      s3
        .upload({
          Bucket: bucket,
          Key: prefix + rawFileName(Date.now()),
          Body: zipped
        })
        .promise()
        .then(res)
        .catch(rej);
    });
  });
}

/**
 * hit api and parse json
 *
 * @param url url string
 */
async function getJson<T>(url: string) {
  const response = await got(url);
  return (await JSON.parse(response.body)) as T;
}

/**
 * create raw filename from timestamp
 *
 * @param time millisecond timestamp
 */
function rawFileName(time: number) {
  return CONSTANTS.RAW_DATA_PREFIX + 'predictit-dump-' + time + '.json.gz';
}
