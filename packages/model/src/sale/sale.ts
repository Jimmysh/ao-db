import { ICollectionOptions, SyncType } from 'ao-db-core';

import { IItemModel } from '../item/item';

export interface ISaleModel {
  type: string; // 售卖方式
  template: string; // 售卖模板
  items: IItemModel[]; // 售卖的商品
  isSale: boolean; // 是否在售
  startAt: number; // 销售开始时间
  endAt: number; // 销售结束时间
  isNew: boolean; // 是否新品
  newStartAt: number; // 新品开始时间
  newEndAt: number; // 新品结束时间
  isPresell: boolean; // 是否可预售

  // 自动放入购物车产品（例如配件）
  requireSales: any[];
  // 相关产品
  relateSales: any[];
  // 交叉销售
  crossSales: any[];
}

export const sale: ICollectionOptions = {
  id: 'sale',
  model: {
  }
};
