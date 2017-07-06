import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IProductAttributeValueModel {
  name: string;
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
      type: 'string',
      title: '父级',
      description: '父级 id'
    },
    attributeId: {
      type: 'string',
      title: '属性',
      description: '所属属性'
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
