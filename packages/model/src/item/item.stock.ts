import { ICollectionOptions } from 'ao-db-core';

export interface IItemStorage {
  itemId: string;
  skuId: string;
  stockId: string;
  quantity: number;
}

export const itemStorage: ICollectionOptions = {
  id: 'item.storage',
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
