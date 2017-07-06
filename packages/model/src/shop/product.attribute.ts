import * as product from './product';

import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IProductAttributeModel {
  name: string;
  isSale: boolean;
  isSelect: boolean;
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
    isSale: {
      type: 'boolean',
      title: '是否sku',
      default: false,
      description: 'sku'
    },
    isSelect: {
      type: 'boolean',
      title: '是否可选',
      default: false,
      description: '售卖特性会出现在用户定制菜单里'
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
