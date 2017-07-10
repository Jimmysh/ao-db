import { ICollectionOptions } from 'ao-db-core';

export interface IItemSkuModel {
  itemId: string; // item id
  isSemiFinished: string; // 是否是半成品
  properties: any[]; // 属性组合
  price: number; // 价格
  hashCode: number; // code
  safeStockQuantity: number; // 安全库存量
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
    price: {
      type: 'number'
    },
    hashCode: {
      type: 'number'
    }
  }
};
