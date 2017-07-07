import * as helper from './helper';

import { AoDB, IAoDBOptions, SyncType } from 'ao-db-core';
import { get, isEmpty, now } from 'lodash';

import { test } from 'ava';

const db = helper.DB.collection.get(helper.sync.basic.model.id);

test.cb(t => {
  let needUpdate: any;
  const name = Math.random();
  const updateName = Math.random().toString(32);

  let isUp = false;

  db.sync$
    .filter(d => d.pid === 'SYNC_MANAGER')
    .filter(d => d.type === 'change')
    .subscribe((syncInfo: any) => {
      const doc = syncInfo.data.change.docs[0];
      if (!needUpdate) {
        t.deepEqual(doc.name, name);
      } else if (isUp) {
        t.deepEqual(doc.name, updateName);
        db.local.get(needUpdate.id)
          .then(d => {
            if (d.name === updateName) {
              t.end();
            }
          });
      }

      if (!isUp && needUpdate) {
        isUp = true;
        db.update({ _id: needUpdate.id, _rev: needUpdate.rev, name: updateName }).then(d => console.log());
      }
    });

  db
    .create({ name })
    .then(d => {
      needUpdate = d;
    });
});
