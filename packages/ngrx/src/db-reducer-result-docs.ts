import { ENTITIES, IDS, dbState } from './db-vars';

import { Action } from '@ngrx/store';
import { fromJS } from 'immutable';
import { isArray } from 'lodash';

/**
 * 向 state 里写 doc 数据
 *
 * @export
 * @param {*} state
 * @param {Action} { type, payload }
 * @returns
 */
export function dbDoc(state: any, { type, payload }: Action) {
  const TABLE: string = payload && payload.table;
  let db = dbState;
  const getDb = state.get(TABLE);
  if (getDb) {
    db = getDb;
  }

  const needSaveDocs = isArray(payload.docs) ? payload.docs : [payload.docs];

  switch (type) {
    case 'add':
      db = db.withMutations(e => {
        needSaveDocs.forEach((doc: any) => {
          e.set(IDS, e.get(IDS).union([doc._id]));
          e.set(ENTITIES, e.get(ENTITIES).set(doc._id, fromJS(doc)));
        });
      });
      break;
    default:
      return state;
  }
  return state.set(TABLE, db);
}
