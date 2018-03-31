import * as AJV from 'ajv';
import { schema } from './predictit';

const ajv = new AJV({
  allErrors: true,
  extendRefs: 'fail'
});

// tslint:disable-next-line
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export const validate = ajv.compile(schema);
