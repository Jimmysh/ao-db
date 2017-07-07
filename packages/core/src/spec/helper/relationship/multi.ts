import { ICollectionOptions, SyncType } from 'ao-db-core';

/**
 * oneToMany: 男人有多个汽车
 * oneToOne: 汽车有唯一个品牌
 * manyToMany: 男人喜欢多个品牌
 * oneToMany: 汽车有几把钥匙
 * oneToOneInsert: 每个钥匙有一个电子证书
 */

export const man: ICollectionOptions = {
  id: 'multi.man',
  view: true,
  local: {
    name: 'multi.man'
  },
  remote: {
    name: 'multi.man'
  },
  model: {
    name: {
      type: 'string'
    },
    cars: {
      collection: 'multi.car',
      via: 'owner'
    },
    faveBrand: {
      collection: 'multi.brand',
      via: 'man'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};

export const car: ICollectionOptions = {
  id: 'multi.car',
  local: {
    name: 'multi.car'
  },
  remote: {
    name: 'multi.car'
  },
  model: {
    name: {
      type: 'string'
    },
    brand: {
      model: 'multi.brand'
    },
    keys: {
      collection: 'multi.key',
      via: 'car'
    },
    owner: {
      model: 'multi.man'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};

export const brand: ICollectionOptions = {
  id: 'multi.brand',
  local: {
    name: 'multi.brand'
  },
  remote: {
    name: 'multi.brand'
  },
  model: {
    name: {
      type: 'string'
    },
    man: {
      collection: 'multi.man',
      via: 'faveBrand'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};

export const key: ICollectionOptions = {
  id: 'multi.key',
  local: {
    name: 'multi.key'
  },
  remote: {
    name: 'multi.key'
  },
  model: {
    name: {
      type: 'string'
    },
    certificate: {
      model: 'multi.certificate',
      insert: true
    },
    car: {
      model: 'multi.car'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};

export const certificate: ICollectionOptions = {
  id: 'multi.certificate',
  local: {
    name: 'multi.certificate'
  },
  remote: {
    name: 'multi.certificate'
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

//  man view 数据
const manViewDemo = {
  _id: 'xx',
  name: 'xx',
  faveBrand: ['p'],
  cars: {
    keys: ['BYD'],
    map: {
      BYD: {
        name: 'BYD',
        brand: 'byd',
        owner: 'xx',
        keys: {
          keys: ['adf'],
          map: {
            adf: {
              name: 'k1',
              certificate: {
                name: 'asdf'
              }
            }
          }
        }
      }
    }
  }
};
