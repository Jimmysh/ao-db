import { ICollectionOptions } from 'ao-db-core';

export interface IItemPicture {
  isMain: boolean; // 是否主图
  isHover: boolean; // 是否鼠标展示图
  isShow: boolean; // 是否列表显示
  displayOrder: number; // 显示优先级
}

export const itemPicture: ICollectionOptions = {
  id: 'item.picture',
  model: {
    itemId: {
      model: 'item'
    },
    resource: {
      model: 'resource'
    },
    isMain: {
      type: 'boolean'
    },
    isHover: {
      type: 'boolean'
    },
    isShow: {
      type: 'boolean'
    },
    displayOrder: {
      type: 'number',
      default: 0
    }
  }
};
