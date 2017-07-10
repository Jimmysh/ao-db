import { ICollectionOptions } from 'ao-db-core';

export interface IItemDetail {
  type: string; // 类型
  platform: string; // 平台
  elements: any[]; // 元素
}

export const itemDetail: ICollectionOptions = {
  id: 'item.detail',
  model: {
    itemId: {
      model: 'item'
    },
    platform: {
      type: 'string'
    },
    elements: {
      collection: 'element',
      via: 'itemId'
    },
    type: {
      type: 'string'
    }
  }
};
