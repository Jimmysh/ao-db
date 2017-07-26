import { ICollectionOptions, SyncType } from 'ao-db-core';

import { IProductAttributeModel } from './attribute';
import { IProductCategoryModel } from './category';
import { IProductServiceModel } from './service';

// 对一个产品的广义上的定义
export interface IProductModel {
  name: string; // 产品名字
  attributes: string[]; // 特性
  categories: string[]; // 分类
  services: string[]; // 服务
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
