import * as IDBPouch from 'pouchdb-adapter-idb';
import * as WebSqlPouch from 'pouchdb-adapter-websql';

import { AoDB, PouchDB } from 'ao-db-core';
import { DBHelper, DBResultActions, DBTaskActions, IDatabase } from 'ao-db-ngrx';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { forIn, get, map, set } from 'lodash';

import { IAoDBServiceConfig } from './interface';
import { Store } from '@ngrx/store';

export const AO_DB_SERVICE_CONFIG = new InjectionToken<IAoDBServiceConfig>('AO_DB_SERVICE_CONFIG');

PouchDB
  .plugin(IDBPouch)
  .plugin(WebSqlPouch);

@Injectable()
export class AoDBService implements IDatabase {
  private readonly _db: AoDB;
  constructor(
    store: Store<any>,
    task: DBTaskActions,
    result: DBResultActions,
    @Inject(AO_DB_SERVICE_CONFIG) config: IAoDBServiceConfig
  ) {
    this._db = new AoDB(config);
    const helpConfig = {
      store,
      db: this._db,
      task,
      result,
      storeName: config.storeName
    };

    forIn(config.collections, m => {
      const id: string = m.config.id;
      set(this, id, new DBHelper(this._db.collection.get(id), helpConfig));
    });
  }

  getTable<T>(id: string): DBHelper<T> {
    return get(this, id) as DBHelper<T>;
  }
}
