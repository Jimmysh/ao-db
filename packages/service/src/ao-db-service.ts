import * as IDBPouch from 'pouchdb-adapter-idb';
import * as WebSqlPouch from 'pouchdb-adapter-websql';
import * as models from './models';

import { AoDB, PouchDB } from 'ao-db-core';
import { DBHelper, DBResultActions, DBTaskActions, IDatabase } from 'ao-db-ngrx';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { forIn, get, map } from 'lodash';

import { IMLabDBConfig } from './interface';
import { Store } from '@ngrx/store';

export const MLAB_DB_CONFIG = new InjectionToken<IMLabDBConfig>('MLAB_DB_CONFIG');

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
    @Inject(MLAB_DB_CONFIG) config: IMLabDBConfig
  ) {
    const collections = map(models, (v: any) => v.config);
    this._db = new AoDB({
      host: config.host,
      collections
    });
    const helpConfig = {
      store,
      db: this._db,
      task,
      result,
      storeName: config.storeName
    };
    forIn(models, m => {
      const id: string = m.config.id;
      (this as any)[id] = new DBHelper(this._db.collection.get(id), helpConfig);
    });
  }

  getTable<T>(id: string): DBHelper<T> {
    return get(this, id) as DBHelper<T>;
  }
}
