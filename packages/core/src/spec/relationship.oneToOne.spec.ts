import * as helper from './helper';

import { AoDB, IAoDBOptions, SyncType } from 'ao-db-core';
import { assign, get, isEmpty, now } from 'lodash';

import { test } from 'ava';

const customer = helper.DB.collection.get(helper.relationship.oneToMany.customer.id);
const payment = helper.DB.collection.get(helper.relationship.oneToMany.payment.id);

// view
const customerView = helper.DB.view.get(helper.relationship.oneToMany.customer.id);

test(async t => {
  const customerName = Math.random().toString();
  const paymentName = Math.random().toString();
  const customerData = await customer.create({ name: customerName });
  const paymentData = await payment.create({ name: paymentName, customer: customerData.id });
  await customerView.check(customerData.id);
  const viewData = await customerView.collection.remote.get(customerData.id);
  t.deepEqual(viewData.name, customerName);
  t.deepEqual(viewData.payments.keys[0], paymentData.id);

  // 更新
  await customer.remote.update(assign({
    _id: customerData.id,
    _rev: customerData.rev,
    name: 'updateName'
  }));
  await customerView.check(customerData.id);
  const viewUpdateData = await customerView.collection.remote.get(customerData.id);
  t.deepEqual(viewUpdateData.name, 'updateName');
});
