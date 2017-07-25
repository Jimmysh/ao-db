import { ICollectionOptions, SyncType } from 'ao-db-core';

// 元素 用来显示组件配置
export interface IElementModel {
  name: string;
  config: any;
}

export const elementConfig: ICollectionOptions = {
  id: 'element',
  model: {
    name: {
      type: 'string',
      required: true
    },
    config: {
      type: 'any',
      default: ''
    }
  }
};
