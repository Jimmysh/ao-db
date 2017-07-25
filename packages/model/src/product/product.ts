import { ICollectionOptions, SyncType } from 'ao-db-core';

import { IProductAttributeModel } from './attribute';
import { IProductCategoryModel } from './category';
import { IProductServiceModel } from './service';

export interface IProductModel {
  name: string;
  attributes: string[];
  categories: string[];
  services: string[];
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
  }
};
