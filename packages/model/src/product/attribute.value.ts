import { ICollectionOptions, SyncType } from 'ao-db-core';

// 属性可选值
export interface IProductAttributeValueModel {
  name: string; // 可选值名字
  attributeId: string; // 可选值 id
  parentId: string; // 父级
  isLeaf: boolean; // 是否是叶子可选值
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
