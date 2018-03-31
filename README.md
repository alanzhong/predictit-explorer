# PredictIt Explorer

Visualizing historical and current predictit data on the cheap.

![Screenshot](/assets/screenshot.png)

## What is this?

[PredictIt](https://www.predictit.org) is a political prediction market, allowing users to place bets on whether or not certain political will occur. Varying between 0 and 1 dollar, share prices can be seen as a proxy for the market's estimated probability of a given event.

This is a tool to present PredictIt market data in a more easily consumable format. Data is taken from the public API
in 5 minute snapshots, and daily aggregate prices are continuously re-computed.

## AWS Architecture

One of the goals of building this was to see how cheaply and effectively
one could store and process real-ish time data only using serverless components.

Below, a diagram of the tool's infrastructure is presented.

![AWS Architecture](/assets/aws_setup.png)

The process starts with an [AWS Lambda function](./src/backend/lambda/poll.ts) running every 5 minutes; hitting the PredictIt api and dumping the result to S3. The S3 object insertion then triggers a separate [Lambda function](./src/backend/lambda/insert.ts) to clean and insert market prices and metadata into an RDS instance.

Next, a third [Lambda function queries the PostgreSQL RDS](./src/backend/lambda/client-data.ts) instance to produce daily aggregate numbers for all markets. These aggregates are formatted for the client application and dumped into a public S3 bucket.

Finally the [client side app](./src/client/) and updated data are served through a Route 53 domain via CloudFront.

In terms of cost, the RDS instance is by far the biggest portion at around 11$ per month. The Lambda functions, S3 buckets, and routing services are effectively free. Additionally, as users are only hitting objects on S3 through cloudfront, the tool is free from scaling concerns.

## Development

### Starting the client app dev server

First, install [NodeJS](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/) and install the dependencies:

```shell
yarn
```

Next, run the dev server

```shell
yarn start
```

### Building a lambda zip file

Export the function name as an ENV variable and run the `build` script.

```shell
export FN="insert" && npm run package:lambda
```
