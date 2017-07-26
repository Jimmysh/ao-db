import * as product from './product';

import { ICollectionOptions, SyncType } from 'ao-db-core';

import { IProductAttributeValueModel } from './attribute.value';

// 产品特性
export interface IProductAttributeModel {
  name: string; // 名字
  isSale: boolean; // 销售属性
  isSelect: boolean; // 是否可选属性
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
  }
};
