import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IProductModel {
  name: string;
}

export const productModelConfig: ICollectionOptions = {
  id: 'product',
  view: true,
  local: {
    name: 'product',
    revs_limit: 1,
    auto_compaction: true
  },
  remote: {
    name: 'product'
  },
  model: {
    name: {
      type: 'string',
      required: true,
      minLength: 1
    },
    attributes: {
      collection: 'product.attribute',
      through: 'product_attribute',
      via: 'productId'
    },
    categories: {
      collection: 'product.category',
      through: 'product_category',
      via: 'productId'
    },
    services: {
      collection: 'product.service',
      through: 'product_service',
      via: 'productId'
    }
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
