import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IItemModel {
  name: string;
  type: string; // 商品类型 （主要商品，配件，虚拟物品）
  description: string;
  keywords: string[];
  title: string;
}

export const itemConfig: ICollectionOptions = {
  id: 'item',
  model: {
    name: {
      type: 'string',
      required: true,
      minLength: 1
    },
    description: {
      type: 'string'
    },
    keywords: {
      type: 'array'
    },
    title: {
      type: 'string',
      required: true,
      minLength: 1
    },
    details: {
      collection: 'item.detail',
      via: 'itemId',
    },
    categories: {
      collection: 'product.category',
      through: 'item_category',
      via: 'itemtId'
    },
    services: {
      collection: 'product.service',
      through: 'item_service',
      via: 'itemtId'
    },
    properties: {
      collection: 'item.property',
      pk: 'attributeId',
      via: 'itemId'
    }
  },
  local: {
    name: 'item',
    revs_limit: 1,
    auto_compaction: true
  },
  remote: {
    name: 'item'
  }
};
