import { ICollectionOptions, SyncType } from 'ao-db-core';

import { IItemDetail } from './detail';

export enum ItemType {
  Product, // 产品
  Accessory, // 配件
  Card // 虚拟卡
}

export interface IItemModel {
  type: ItemType; // 商品类型 （主要商品，配件，虚拟物品）
  name: string;
  description: string;
  keywords: string[];
  title: string;
  details: IItemDetail[];
  categories: string[];
  services: string[];
  properties: string[];
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
