import { ICollectionOptions, SyncType } from 'ao-db-core';

/**
 * 一个用户有一个外链的配置文件, 这个配置文件可链接多个人
 */
export const user: ICollectionOptions = {
  id: 'oneToOneLink.user',
  view: true,
  local: {
    name: 'oneToOneLink.user'
  },
  remote: {
    name: 'oneToOneLink.user'
  },
  model: {
    name: {
      type: 'string'
    },
    profile: {
      model: 'oneToOneLink.profile',
      insert: true
    }
  },
  sync: {
    type: SyncType.Full,
    options: {
    }
  }
};

export const userProfile: ICollectionOptions = {
  id: 'oneToOneLink.profile',
  local: {
    name: 'oneToOneLink.profile'
  },
  remote: {
    name: 'oneToOneLink.profile'
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

//  user view 数据
const userViewDemo = {
  _id: 'xx',
  name: 'xx',
  profile: 'id'
};
