import * as relationship from './relationship'
import * as sync from './sync'

import { AoDB, IAoDBOptions } from 'ao-db-core'

import { host } from './global'

const conf: IAoDBOptions = {
  host,
  collections: [
    sync.basic.model,
    relationship.manyToMany.driver,
    relationship.manyToMany.taxi,
    relationship.oneToOne.user,
    relationship.oneToOne.userProfile,
    relationship.oneToOneInsert.user,
    relationship.oneToOneInsert.userProfile,
    relationship.oneToMany.customer,
    relationship.oneToMany.payment,
    relationship.multi.brand,
    relationship.multi.car,
    relationship.multi.certificate,
    relationship.multi.key,
    relationship.multi.man
  ]
}

const DB = new AoDB(conf)

export {
  DB,
  sync,
  relationship
}
