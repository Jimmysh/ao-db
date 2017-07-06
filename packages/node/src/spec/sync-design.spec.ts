import * as helper from './helper'

import { IAoDBOptions, SyncType } from 'ao-db-core'
import { get, isEmpty, isFunction, now } from 'lodash'

import { AoDBNode } from 'ao-db-node'
import { test } from 'ava'

const db = helper.DB.collection.get(helper.design.basic.id)

test(async t => {
  const sync = await helper.DB.design.sync(helper.design.basic.id)
  const doc: any = await db.remote.get('_design/ACL')
  t.true((doc.validate_doc_update as string).startsWith('function'))
})
