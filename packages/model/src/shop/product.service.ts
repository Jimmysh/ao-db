import * as product from './product';

import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IProductServiceModel {
  name: string;
}

export const productServiceConfig: ICollectionOptions = {
  id: 'product.service',
  local: {
    name: 'product-service',
    revs_limit: 1,
    auto_compaction: true
  },
  remote: {
    name: 'product-service'
  },
  model: {
    name: {
      type: 'string',
      required: true,
      minLength: 1
    },
    productId: {
      collection: 'product',
      through: 'product_attribute',
      via: 'services'
    },
  },
  sync: {
    type: SyncType.Full,
    options: {
      pull: true,
      selector: {
        _deleted: {
          $exists: false
        }
      }
    }
  }
};
