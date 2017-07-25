import * as helper from './helper';

import { AoDB, IAoDBOptions, SyncType } from 'ao-db-core';

import { test } from 'ava';

const product = helper.DB.collection.get(helper.models.productModelConfig.id);
const service = helper.DB.collection.get(helper.models.productServiceConfig.id);


const view = helper.DB.view.get(helper.models.productModelConfig.id);

test(async t => {
  const productData = await product.create({ name: Math.random() });
  const serviceData = await service.updateOrCreate('serviceA', { name: 'serviceA' })

  console.log(product.relationColls['services'].config.model)
  await product.relationColls['services']
    .create({
      services: serviceData.id,
      productId: productData.id
    });
  //
  await view.check(productData.id);
  const viewData = await view.collection.remote.get(productData.id);

  console.log('viewData', viewData);
  const _services = viewData.services as string[];
  t.truthy(_services.indexOf('serviceA') !== -1);
  t.pass();
});
