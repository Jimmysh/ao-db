import * as helper from './helper';

import { AoDB, IAoDBOptions, SyncType } from 'ao-db-core';

import { test } from 'ava';

const db = helper.DB.collection.get(helper.models.productModelConfig.id);

test(async t => {
  t.truthy(db);
  t.pass();
});
