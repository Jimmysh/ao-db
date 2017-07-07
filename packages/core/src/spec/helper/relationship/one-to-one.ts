import { ICollectionOptions, SyncType } from 'ao-db-core';

/**
 * 一个用户有一个配置文件, 这个配置文件也只有一个用户
 */
export const user: ICollectionOptions = {
  id: 'oneToOne.user',
  view: true,
  local: {
    name: 'oneToOne.user'
  },
  remote: {
    name: 'oneToOne.user'
  },
  model: {
    name: {
      type: 'string'
    },
    profile: {
      model: 'oneToOne.profile'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};

export const userProfile: ICollectionOptions = {
  id: 'oneToOne.profile',
  local: {
    name: 'oneToOne.profile'
  },
  remote: {
    name: 'oneToOne.profile'
  },
  model: {
    name: {
      type: 'string'
    },
    user: {
      model: 'oneToOne.user'
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};

//  user view 数据
const userViewDemo = {
  _id: 'xx',
  name: 'xx',
  profile: {
    name: 'bbb'
  }
};
