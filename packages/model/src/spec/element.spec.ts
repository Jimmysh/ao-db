import * as helper from './helper';

import { AoDB, IAoDBOptions, SyncType } from 'ao-db-core';

import { test } from 'ava';

const db = helper.DB.collection.get(helper.models.envionmentConfig.id);

test(async t => {
  const d = await db.create({ _id: 'adf', config: 'adf' });
  console.log(d)
  t.truthy(db);
  t.pass();
});
