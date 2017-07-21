import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IPostCategoryModel {
  name: string; // 名字
  parentId: string; // 父级
}

export const postCategoryConfig: ICollectionOptions = {
  id: 'post.category'
};
