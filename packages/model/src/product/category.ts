import * as product from './product';

import { ICollectionOptions, SyncType } from 'ao-db-core';

// 产品分类
export interface IProductCategoryModel {
  name: string; // 分类名字
  isLeaf: boolean; // 是否是叶子类目
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
    isLeaf: {
      type: 'boolean',
      default: false
    },
    parentId: {
      model: 'product.category'
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
