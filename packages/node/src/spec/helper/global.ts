import * as find from 'pouchdb-find';
import * as http from 'pouchdb-adapter-http';
import * as mapReduce from 'pouchdb-mapreduce';
import * as memory from 'pouchdb-adapter-memory';
import * as replication from 'pouchdb-replication';
import * as security from 'pouchdb-security';

import { AoDB, IAoDBOptions, ICollectionOptions, PouchDB, SyncType } from 'ao-db-core';

import { test } from 'ava';

PouchDB
  .plugin(memory)
  .plugin(http)
  .plugin(find)
  .plugin(mapReduce)
  .plugin(replication)
  .plugin(security);

export const host = 'http://127.0.0.1:11111';
