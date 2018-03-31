import { ScheduledHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { updateAggregations } from '../../postgres/aggregate';

/**
 * update daily and hourly series aggregations
 */
export const handler: ScheduledHandler = async (event, context, callback) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    await updateAggregations();
    callback();
  } catch (err) {
    callback(err);
  }
};
