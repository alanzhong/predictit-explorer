export const schema = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  definitions: {},
  $id: 'https://www.predictit.org/api/marketdata/all/',
  additionalProperties: false,
  minProperties: 1,
  properties: {
    Markets: {
      $id: '/properties/Markets',
      items: {
        $id: '/properties/Markets/items',
        additionalProperties: false,
        minProperties: 9,
        properties: {
          Contracts: {
            $id: '/properties/Markets/items/properties/Contracts',
            items: {
              $id: '/properties/Markets/items/properties/Contracts/items',
              additionalProperties: false,
              minProperties: 15,
              properties: {
                BestBuyNoCost: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/BestBuyNoCost',
                  type: ['number', 'null']
                },
                BestBuyYesCost: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/BestBuyYesCost',
                  type: ['number', 'null']
                },
                BestSellNoCost: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/BestSellNoCost',
                  type: ['number', 'null']
                },
                BestSellYesCost: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/BestSellYesCost',
                  type: ['number', 'null']
                },
                DateEnd: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/DateEnd',
                  type: 'string'
                },
                ID: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/ID',
                  type: 'integer'
                },
                Image: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/Image',
                  type: 'string'
                },
                LastClosePrice: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/LastClosePrice',
                  type: ['number', 'null']
                },
                LastTradePrice: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/LastTradePrice',
                  type: ['number', 'null']
                },
                LongName: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/LongName',
                  type: 'string'
                },
                Name: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/Name',
                  type: 'string'
                },
                ShortName: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/ShortName',
                  type: 'string'
                },
                Status: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/Status',
                  type: 'string'
                },
                TickerSymbol: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/TickerSymbol',
                  type: 'string'
                },
                URL: {
                  $id:
                    '/properties/Markets/items/properties/Contracts/items/properties/URL',
                  type: 'string'
                }
              },
              type: 'object'
            },
            type: 'array'
          },
          ID: {
            $id: '/properties/Markets/items/properties/ID',
            type: 'integer'
          },
          Image: {
            $id: '/properties/Markets/items/properties/Image',
            type: 'string'
          },
          Name: {
            $id: '/properties/Markets/items/properties/Name',
            type: 'string'
          },
          ShortName: {
            $id: '/properties/Markets/items/properties/ShortName',
            type: 'string'
          },
          Status: {
            $id: '/properties/Markets/items/properties/Status',
            type: 'string'
          },
          TickerSymbol: {
            $id: '/properties/Markets/items/properties/TickerSymbol',
            type: 'string'
          },
          TimeStamp: {
            $id: '/properties/Markets/items/properties/TimeStamp',
            type: 'string'
          },
          URL: {
            $id: '/properties/Markets/items/properties/URL',
            type: 'string'
          }
        },
        type: 'object'
      },
      type: 'array'
    }
  },
  type: 'object'
};
