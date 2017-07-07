import * as helper from './helper';

import { AoDB, IAoDBOptions, SyncType } from 'ao-db-core';
import { assign, get, isEmpty, now } from 'lodash';

import { test } from 'ava';

const user = helper.DB.collection.get(helper.relationship.oneToOneInsert.user.id);
const userProfile = helper.DB.collection.get(helper.relationship.oneToOneInsert.userProfile.id);

// view
const userView = helper.DB.view.get(helper.relationship.oneToOneInsert.user.id);

test(async t => {
  const userName = Math.random().toString();
  const profileName = Math.random().toString();;
  const profile = await userProfile.create({ name: profileName });
  const userData = await user.create({ name: userName, profile: profile.id });
  await userView.check(userData.id);
  const viewData = await userView.collection.remote.get(userData.id);
  t.deepEqual(viewData.name, userName);
  t.deepEqual(viewData.profile.name, profileName);
  // 更新
  await user.remote.update(assign({ _id: userData.id, _rev: userData.rev, profile: profile.id, name: 'aaa' }));
  await userView.check(userData.id);
  const viewUpdateData = await userView.collection.remote.get(userData.id);
  t.deepEqual(viewUpdateData.name, 'aaa');
  t.deepEqual(viewUpdateData.profile.name, profileName);
});
