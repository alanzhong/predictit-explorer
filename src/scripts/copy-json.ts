import * as aws from 'aws-sdk';
import { RAW_DATA_BUCKET } from '../backend/lambda/constants';

const timeRegex = /predictit-dump-(\d+)\.json/;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const s3 = new aws.S3();

/**
 * copy existing data from <bucket>/json to <bucket>/raw only including every 5 minutes
 */
async function copy() {
  const keys = await getAllKeys();
  console.log(`${keys.length} total keys...`);
  const filtered = filterKeys(keys);
  console.log(`${filtered.length} filtered keys...`);

  const BUCKET_SIZE = 50;
  const total = filtered.length;
  let copied = 0;

  while (filtered.length) {
    const bucket = filtered.splice(0, BUCKET_SIZE);
    await Promise.all(bucket.map(copyObject));
    copied += bucket.length;
    if (copied % 1000 === 0) {
      console.log(`Copied ${copied}/${total} objects...`);
    }

    await sleep(100);
  }
}

async function getAllKeys(prefix = 'raw/') {
  let done = false;

  const params: aws.S3.ListObjectsV2Request = {
    Bucket: RAW_DATA_BUCKET,
    MaxKeys: 1000,
    Prefix: prefix
  };

  const allKeys: string[] = [];

  while (!done) {
    const result = await s3.listObjectsV2(params).promise();
    const truncated = !!result.IsTruncated;
    const token = result.NextContinuationToken;
    const keys = (result.Contents || []).map(o => o.Key).filter(isDefined);
    allKeys.push(...keys);

    if (truncated) {
      params.ContinuationToken = token;
    } else {
      done = true;
    }

    console.log(`Collected ${allKeys.length}...`);
    await sleep(50);
  }

  return allKeys.sort();
}

/**
 * filter keys to a period of at least <step>ms
 */
function filterKeys(keys: string[], step = 5 * MINUTE) {
  const out: string[] = [];
  const start = keys.pop;
  let time: number | undefined;

  for (const key of keys) {
    const nextTime = getTimeFromKey(key);
    if (time) {
      if (nextTime - time >= step) {
        out.push(key);
        time = nextTime;
      }
    } else {
      time = nextTime;
      out.push(key);
    }
  }

  return out;
}

async function copyObject(key: string) {
  await s3
    .copyObject({
      Bucket: RAW_DATA_BUCKET,
      CopySource: `${RAW_DATA_BUCKET}/${key}`,
      Key: key.replace('json/', 'raw/')
    })
    .promise();
}

function getTimeFromKey(key: string) {
  const result = timeRegex.exec(key);

  if (result) {
    const [match, timestamp] = result;
    return parseInt(timestamp, 10);
  }

  throw new Error(`No timestamp found in key ${key}`);
}

function sleep(n: number) {
  return new Promise<void>(res => setTimeout(res, n));
}

function isDefined<T>(val: T | null | undefined): val is T {
  return typeof val !== 'undefined' && val !== null;
}
