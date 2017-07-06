import { ICollectionOptions } from 'ao-db-core';

export interface IEnvionmentModel {
  key: string;
  value: any;
}

export const envionmentConfig: ICollectionOptions = {
  id: '_envionment',
  local: {
    auto_compaction: true,
    name: 'envionment',
    revs_limit: 1
  },
  model: {
    key: {
      type: 'string',
    },
    value: {
      type: 'any',
    }
  }
};
