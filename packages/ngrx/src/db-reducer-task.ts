import { createTaskRecord, dbState } from './db-vars';

import { Action } from '@ngrx/store';
import { getActionHashCode } from './db-util';

/**
 * 处理 任务
 *
 * @export
 * @param {*} state
 * @param {Action} action
 * @returns
 */
export function dbTask(state: any, action: Action) {
  const payload = action.payload;
  let db = dbState;
  const getDb = state.get(payload.table);
  if (getDb) {
    db = getDb;
  }
  let tasks = db.get('tasks');
  const hashCode = getActionHashCode(action);

  tasks = tasks.set(hashCode, createTaskRecord({
    action
  }));

  db = db.set('tasks', tasks);
  return state.set(payload.table, db);
}
