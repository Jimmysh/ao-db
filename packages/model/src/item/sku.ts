import { ICollectionOptions } from 'ao-db-core';

export interface IItemSkuModel {
  itemId: string; // item id
  isSemiFinished: string; // 是否是半成品
  properties: any[]; // 属性组合
  hashCode: number; // code
}

export const itemSkuConfig: ICollectionOptions = {
  id: 'item.sku',
  model: {
    itemId: {
      model: 'item'
    },
    properties: {
      type: 'object'
    },
    hashCode: {
      type: 'number'
    }
  }
};
