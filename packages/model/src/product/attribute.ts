import * as product from './product';

import { ICollectionOptions, SyncType } from 'ao-db-core';

import { IProductAttributeValueModel } from './attribute.value';

// 产品特性
export interface IProductAttributeModel {
  name: string; // 名字
}

export const productAttributeConfig: ICollectionOptions = {
  id: 'product.attribute',
  local: {
    name: 'product-attribute',
    revs_limit: 1,
    auto_compaction: true
  },
  remote: {
    name: 'product-attribute',
  },
  model: {
    name: {
      title: '名称',
      type: 'string',
      default: '',
      minLength: 2,
      maxLength: 32,
      required: true
    },
    productId: {
      collection: 'product',
      through: 'product_attribute',
      via: 'attributes'
    },
    values: {
      collection: 'product.attribute.value',
      via: 'attributeId'
    },
    controllers: {
      collection: 'product.attribute.value',
      through: 'productAttribute_controller',
      via: 'attributeId'
    }
  }
};
