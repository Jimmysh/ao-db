import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface PostRoute {
  name: string; // 路径
  path?: string; // 路径
  regExp?: string; // 路径正则表达式
  postId: string; // 文章路径
}

export const SaleRouterConfig: ICollectionOptions = {
  id: 'sale.route',
  model: {
  }
};
