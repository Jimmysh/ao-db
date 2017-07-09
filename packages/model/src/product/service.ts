import * as product from './product';

import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IProductServiceModel {
  name: string;
  description: string;
}

export const productServiceConfig: ICollectionOptions = {
  id: 'product.service',
  view: true,
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
    description: {
      type: 'string',
      required: true,
      minLength: 10
    },
    productId: {
      collection: 'product',
      through: 'product_attribute',
      via: 'services'
    },
    itemId: {
      collection: 'item',
      through: 'item_attribute',
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
