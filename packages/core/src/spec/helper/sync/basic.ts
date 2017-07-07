import { ICollectionOptions, SyncType } from 'ao-db-core';

export const model: ICollectionOptions = {
  id: 'sync.basic',
  local: {
    name: 'sync.basic'
  },
  remote: {
    name: 'sync.basic'
  },
  model: {
    name: {
      type: 'string'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};
