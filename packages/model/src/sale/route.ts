import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface SaleRoute {
  path?: string; // 路径
  pathMath?: string; // 路径正则表达式
  saleId: string; // 销售项目 id
}

export const SaleRouterConfig: ICollectionOptions = {
  id: 'sale.route',
  model: {
  }
};
