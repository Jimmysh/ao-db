import * as product from './product';

import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IProductCategoryModel {
  name: string;
}

export const productCategoryConfig: ICollectionOptions = {
  id: 'product.category',
  local: {
    name: 'product-category',
    revs_limit: 1,
    auto_compaction: true
  },
  remote: {
    name: 'product-category'
  },
  model: {
    name: {
      type: 'string',
      required: true,
      minLength: 1
    },
    productId: {
      collection: 'product',
      through: 'product_category',
      via: 'categories'
    },
    itemId: {
      collection: 'item',
      through: 'item_category',
      via: 'categories'
    }
  }
};
