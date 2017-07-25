import { ICollectionOptions } from 'ao-db-core';

// 商品 sku 库存
export interface IItemSkuStockModel {
  itemId: string; // 商品 id
  skuId: string; // sku id
  stockId: string; // 仓库 id
  batchId: string; // 批次
  quantity: number; // 数量
  lockQuantity: number; // 锁定的数量 （已经预订，但是没发货的数量）
  order: number; // 售卖时的排序 先销那些库存
}

export const itemSkuStockConfig: ICollectionOptions = {
  id: 'item.sku.stock',
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
