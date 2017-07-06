import { ICollectionOptions, SyncType } from 'ao-db-core';

export interface IProductAttributeControllerModel {
  name: string;
}

export const productAttributeControllerConfig: ICollectionOptions = {
  id: 'product.attribute.controller',
  local: {
    name: 'product-attribute-controller',
    revs_limit: 1,
    auto_compaction: true
  },
  remote: {
    name: 'product-attribute-controller'
  },
  model: {
    name: {
      type: 'string',
      required: true,
      minLength: 1
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