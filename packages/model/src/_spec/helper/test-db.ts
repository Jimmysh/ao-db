import * as models from 'ao-db-model';

import { AoDB, IAoDBOptions } from 'ao-db-core';

import { host } from './global';

const conf: IAoDBOptions = {
  host,
  collections: [
    models.elementConfig
  ]
};

const DB = new AoDB(conf);

export {
  DB, models
};
