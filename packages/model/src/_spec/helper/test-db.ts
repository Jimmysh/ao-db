import * as models from 'ao-db-model';

import { AoDB, IAoDBOptions } from 'ao-db-core';

import { chain } from 'lodash';
import { host } from './global';

// const collections =
//   chain(models)
//     .filter((v, k: string) => k.includes('Config'))
//     .value();

const conf: IAoDBOptions = {
  host,
  collections: [
    //
    models.elementConfig,
    // product
    models.productModelConfig,
    models.productAttributeConfig,
    models.productAttributeValueConfig,
    models.productCategoryConfig,
    models.productServiceConfig,
  ]
};

const DB = new AoDB(conf);

export {
  DB, models
};
