import { IAoDBOptions, ICollectionOptions } from '../interface/index'
import { assign, cloneDeep, compact, get, has, isEqual, set } from 'lodash'

import { Collection } from '../collection'
import { PouchDB } from '../pouch-db'

export function changeSyncOptionsToLive(options: PouchDB.Replication.SyncOptions, live: boolean): PouchDB.Replication.SyncOptions {
  let backOptions = cloneDeep(options)
  if (has(backOptions, 'live')) {
    backOptions.live = live
  }
  if (has(backOptions, 'pull.live') && backOptions.pull) {
    backOptions.pull.live = live
  }
  if (has(backOptions, 'push.live') && backOptions.push) {
    backOptions.push.live = live
  }
  return backOptions
}

export function isLiveOptions(options: PouchDB.Replication.SyncOptions) {
  return get(options, 'live') || get(options, 'pull.live') || get(options, 'push.live')
}

export function normalizeCollectionSettings(nConf: IAoDBOptions, d: ICollectionOptions) {
  if (nConf.host && d.remote && d.remote.name) {
    if (!d.remote.name.includes('http') && nConf.host.includes('http')) {
      d.remote.name = `${nConf.host}/${d.remote.name}`
    }
  }
}

export function normalizeSettings(conf: IAoDBOptions) {
  conf.collections.forEach(d => normalizeCollectionSettings(conf, d))
  return conf
}
