import * as helper from './helper';

import { AoDB, IAoDBOptions, SyncType } from 'ao-db-core';
import { assign, get, isEmpty, now } from 'lodash';

import { test } from 'ava';

const driver = helper.DB.collection.get(helper.relationship.manyToMany.driver.id);
const taxi = helper.DB.collection.get(helper.relationship.manyToMany.taxi.id);

// view
const driverView = helper.DB.view.get(helper.relationship.manyToMany.driver.id);

test(async t => {
  const driverName = Math.random().toString();
  const taxiName = Math.random().toString();
  const taxiData = await taxi.create({ name: taxiName });
  const driverData = await driver.create({ name: driverName });
  await driver.relationColls['taxis']
    .create({
      drivers: driverData.id,
      taxis: taxiData.id
    });
  await driverView.check(driverData.id);
  const viewData = await driverView.collection.remote.get(driverData.id);
  t.deepEqual(viewData.name, driverName);
  t.deepEqual(viewData.taxis[0], taxiData.id);
});
