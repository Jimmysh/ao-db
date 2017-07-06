import * as PouchDBBase from 'pouchdb-core'
import * as find from 'pouchdb-find'
import * as http from 'pouchdb-adapter-http'
import * as mapReduce from 'pouchdb-mapreduce'
import * as replication from 'pouchdb-replication'

export const PouchDB = PouchDBBase
  .plugin(http)
  .plugin(find)
  .plugin(mapReduce)
  .plugin(replication)
