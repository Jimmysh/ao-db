import * as helper from './helper'

import { AoDB, IAoDBOptions, SyncType } from 'ao-db-core'
import { assign, get, isEmpty, now } from 'lodash'

import { test } from 'ava'

/**
 * oneToMany: 男人有多个汽车
 * oneToOne: 汽车有唯一个品牌
 * manyToMany: 男人喜欢多个品牌
 * oneToMany: 汽车有几把钥匙
 * oneToOneInsert: 每个钥匙有一个电子证书
 */
const car = helper.DB.collection.get(helper.relationship.multi.car.id)
const brand = helper.DB.collection.get(helper.relationship.multi.brand.id)
const key = helper.DB.collection.get(helper.relationship.multi.key.id)
const man = helper.DB.collection.get(helper.relationship.multi.man.id)
const certificate = helper.DB.collection.get(helper.relationship.multi.certificate.id)

// view
const manView = helper.DB.view.get(helper.relationship.multi.man.id)

test(async t => {
  const manName = Math.random().toString()
  const carName = Math.random().toString()
  const brandName = Math.random().toString()
  const keyName = Math.random().toString()
  const certificateName = Math.random().toString()
  const manData = await man.create({ name: manName })
  const brandData = await brand.create({ bane: brandName })
  const carData = await car.create({ name: carName, owner: manData.id, brand: brandData.id })
  const certificateData = await certificate.create({ name: certificateName })
  const keyData = await key.create({ name: keyName, car: carData.id, certificate: certificateData.id })

  await man.relationColls['faveBrand'].create({
    man: manData.id,
    faveBrand: brandData.id
  })
  await manView.check(manData.id)
  const viewData = await manView.collection.remote.get(manData.id)
  t.deepEqual(viewData.name, manName)
  t.deepEqual(viewData.cars.map[carData.id].keys.keys[0], keyData.id)
  t.deepEqual(viewData.cars.map[carData.id].keys.map[keyData.id].certificate.name, certificateName)
})
