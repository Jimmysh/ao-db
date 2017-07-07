import { ICollectionOptions, SyncType } from 'ao-db-core';

/**
 * 一个客户有多个支付方式
 */
export const customer: ICollectionOptions = {
  id: 'oneToMany.customer',
  view: true,
  local: {
    name: 'oneToMany.customer'
  },
  remote: {
    name: 'oneToMany.customer'
  },
  model: {
    name: {
      type: 'string'
    },
    payments: {
      collection: 'oneToMany.payment',
      pk: '_id',
      via: 'customer'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};

export const payment: ICollectionOptions = {
  id: 'oneToMany.payment',
  local: {
    name: 'oneToMany.payment'
  },
  remote: {
    name: 'oneToMany.payment'
  },
  model: {
    name: {
      type: 'string'
    },
    customer: {
      model: 'oneToMany.parent'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};

//  customer view 数据
const customerViewDemo = {
  _id: 'xx',
  name: 'xx',
  paymens: {
    _id: ['a', 'b'],
    map: {
      a: {
        _id: 'a1',
        name: 'aaaa'
      },
      b: {
        _id: 'a2',
        name: 'bbb'
      }
    }
  }
};
