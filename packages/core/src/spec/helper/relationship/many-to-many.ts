import { ICollectionOptions, SyncType } from 'ao-db-core';

/**
 * 一个出租车有多名司机, 一个司机也能开多个出租车
 */
export const driver: ICollectionOptions = {
  id: 'manyToMany.driver',
  view: true,
  local: {
    name: 'manyToMany.driver'
  },
  remote: {
    name: 'manyToMany.driver'
  },
  model: {
    name: {
      type: 'string'
    },
    taxis: {
      collection: 'manyToMany.taxi',
      pk: '_id',
      via: 'drivers'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};

export const taxi: ICollectionOptions = {
  id: 'manyToMany.taxi',
  local: {
    name: 'manyToMany.taxi'
  },
  remote: {
    name: 'manyToMany.taxi'
  },
  model: {
    name: {
      type: 'string'
    },
    drivers: {
      collection: 'manyToMany.driver',
      pk: '_id',
      via: 'taxis'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};

//  driver view 数据
const driverViewDemo = {
  _id: 'xx',
  name: 'xx',
  taxis: ['a', 'b']
};
