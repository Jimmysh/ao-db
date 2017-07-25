import { ICollectionOptions } from 'ao-db-core';

// 库存历史
export enum ItemSkuStockHistoryType {
  Outstock, // 出库
  Instock, // 入库
  StoreCheck, // 盘点
  StoreProfit, // 盘盈
  StoreLoss, // 盘亏
  Lock, // 锁定
}

// 商品 sku 库存变化表
export interface IItemSkuStockHistoryModel {
  itemId: string; // 商品 id
  skuId: string; // sku id
  stockId: string; // 仓库 id
  orderId: string; // 关联订单
  userId: string; // 关联用户
  type: ItemSkuStockHistoryType; //类型
  quantity: number; // 数量
  node: string; // 说明
  createAt: number; // 创建时间
}

export const itemSkuStockHistoryConfig: ICollectionOptions = {
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
