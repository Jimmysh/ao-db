import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IProductAttributeValueModel {
  name: string;
  attributeId: string;
}

export const productAttributeValueConfig: ICollectionOptions = {
  id: 'product.attribute.value',
  local: {
    name: 'product-attribute-value',
    revs_limit: 1,
    auto_compaction: true
  },
  remote: {
    name: 'product-attribute-value'
  },
  model: {
    name: {
      type: 'string',
      title: '名称',
      default: '',
      minLength: 2,
      maxLength: 32,
      required: true
    },
    parentId: {
      model: 'product.attribute.value'
    },
    attributeId: {
      model: 'product'
    }
  }
};
