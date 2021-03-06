import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IStockModel {
  name: string;
}

export const stockConfig: ICollectionOptions = {
  id: 'stock',
  model: {
    name: {
      type: 'string',
      required: true
    },
  }
};
