import { ICollectionOptions } from 'ao-db-core';

export interface IEnvionment {
  key: string;
  value: any;
}

export const EnvionmentConfig: ICollectionOptions = {
  id: '_envionment',
  local: {
    name: 'envionment',
    revs_limit: 1,
    auto_compaction: true
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
