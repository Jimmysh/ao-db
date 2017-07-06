import { ICollectionOptions } from 'ao-db-core';

export interface IEnvionment {
  key: string;
  value: any;
}

export const EnvionmentConfig: ICollectionOptions = {
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
