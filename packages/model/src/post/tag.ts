import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IPostTagModel {
  name: string; // 名字
  parentId: string; // 父级
}

export const PostTagConfig: ICollectionOptions = {
  id: 'post.category'
};
