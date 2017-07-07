import * as helper from './helper';

import { AoDB, IAoDBOptions, SyncType } from 'ao-db-core';
import { get, isEmpty, now } from 'lodash';

import { test } from 'ava';

const db = helper.DB.collection.get(helper.sync.basic.model.id);

test.cb(t => {
  const name = Math.random();
  const updateName = Math.random().toString(32);

  let isUp = false;
  function uuu(doc: any) {
    db.update({ _id: 'test', _rev: doc._rev, name: updateName }).then(d => console.log());
  }
  db.sync$
    .filter(d => d.pid === 'SYNC_MANAGER')
    .filter(d => d.type === 'change')
    .subscribe((syncInfo: any) => {
      const doc = syncInfo.data.change.docs[0];
      if (!isUp) {
        isUp = true;
        uuu(doc);
      }
      db.local.get('test')
        .then(d => {
          if (d.name === updateName) {
            t.end();
          }
        });
    });
  db.updateOrCreate('test', { name }).then(d => console.log());
});
