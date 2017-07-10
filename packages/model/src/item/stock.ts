import { ICollectionOptions } from 'ao-db-core';

export interface IItemStockModel {
  itemId: string; // 商品 id
  skuId: string; // sku id
  stockId: string; // 仓库 id
  quantity: number; // 数量
  lockQuantity: number; // 锁定的数量 （已经预订，但是没发货的数量）
}

export const itemStockConfig: ICollectionOptions = {
  id: 'item.stock',
  model: {
    itemId: {
      model: 'item'
    },
    skuId: {
      model: 'item.sku'
    },
    stockId: {
      model: 'stock'
    },
    quantity: {
      type: 'number'
    }
  }
};
