import * as helper from './helper';

import { IAoDBOptions, SyncType } from 'ao-db-core';
import { get, isEmpty, isFunction, now } from 'lodash';

import { AoDBNode } from 'ao-db-node';
import { test } from 'ava';

const db = helper.DB.collection.get(helper.design.basic.id);

test(async t => {
  const sync = await helper.DB.security.sync(helper.design.basic.id);
  const doc: any = await db.remote.getSecurity();
  t.truthy(doc.admins);
  t.truthy(doc.members);
});
