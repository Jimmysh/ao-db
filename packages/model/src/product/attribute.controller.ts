import { ICollectionOptions, SyncType } from 'ao-db-core';

// 产品特性控制器
export interface IProductAttributeControllerModel {
  name: string; // 名字
}

export const productAttributeControllerConfig: ICollectionOptions = {
  id: 'product.attribute.controller',
  local: {
    name: 'product-attribute-controller',
    revs_limit: 1,
    auto_compaction: true
  },
  remote: {
    name: 'product-attribute-controller'
  },
  model: {
    name: {
      type: 'string',
      required: true,
      minLength: 1
    },
    attributeId: {
      collection: 'product.attribute',
      through: 'productAttribute_controller',
      via: 'controllers'
    },
  }
};
