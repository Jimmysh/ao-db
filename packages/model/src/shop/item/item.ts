import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IItemModel {
  name: string;
  description: string;
  keywords: string[];
  title: string;
}

export const itemConfig: ICollectionOptions = {
  id: 'item',
  local: {
    name: 'item',
    revs_limit: 1,
    auto_compaction: true
  },
  remote: {
    name: 'item'
  },
  model: {
    name: {
      type: 'string',
      required: true,
      minLength: 1
    },
    keywords: {
      type: 'array'
    },
    title: {
      type: 'string',
      required: true,
      minLength: 1
    },
    description: {
      type: 'string'
    },
    categories: {
      collection: 'product.category',
      through: 'item_category',
      via: 'itemtId'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
      pull: true,
      selector: {
        _deleted: {
          $exists: false
        }
      }
    }
  }
};
