import { ICollectionOptions } from 'ao-db-core';

export interface IItemSku {
  properties: any;
  price: number;
  hashCode: number;
}

export const itemSku: ICollectionOptions = {
  id: 'item.sku',
  model: {
    itemId: {
      model: 'item'
    },
    properties: {
      type: 'object'
    },
    price: {
      type: 'number'
    },
    hashCode: {
      type: 'number'
    }
  }
};
