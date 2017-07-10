import { ICollectionOptions, SyncType } from 'ao-db-core';

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
    }
  }
};
