import { createDBError, dbState } from './db-vars';

import { Action } from '@ngrx/store';
import { DBResultActions } from './db-result-actions';
import { Set } from 'immutable';
import { TaskState } from './interface';
import { dbDoc } from './db-reducer-result-docs';
import { isArray } from 'lodash';

function _dbResultFn(state: any, { type, payload }: Action) {
  const TABLE: string = payload && payload.table;
  let db = dbState;
  const getDb = state.get(TABLE);
  if (getDb) {
    db = getDb;
  }
  let tasks: any = db.get('tasks');
  let taskRecord: any = tasks.get(payload.hashCode);

  switch (type) {
    case DBResultActions.WRITE_SUCCESS:
    case DBResultActions.SUCCESS_WITH_DOC:
      let result;
      if (isArray(payload.docs)) {
        const ids = payload.docs.map((d: any) => d._id || d.id);
        result = Set(ids);
      } else {
        result = payload.docs._id || payload.docs.id;
      }
      taskRecord = taskRecord.merge({
        ok: true,
        state: TaskState.Complete,
        success: result
      });
      break;
    case DBResultActions.ERROR:
      taskRecord = taskRecord.merge({
        error: createDBError(payload.error),
        state: TaskState.Failed
      });
      break;
    default:
  }
  tasks = tasks.set(payload.hashCode, taskRecord);
  db = db.set('tasks', tasks);
  return state.set(TABLE, db);
}

/**
 * 处理任务结果
 *
 * @export
 * @param {*} state
 * @param {Action} { type, payload }
 * @returns
 */
export function dbResult(state: any, { type, payload }: Action) {
  switch (type) {
    case DBResultActions.DOCS:
      payload.forEach((d: any) => {
        state = dbDoc(state, { type: 'add', payload: d });
      });
      return state;
    case DBResultActions.DOC:
      return dbDoc(state, { type: 'add', payload });
    case DBResultActions.SUCCESS_WITH_DOC:
      state = dbDoc(state, { type: 'add', payload });
    case DBResultActions.WRITE_SUCCESS:
    case DBResultActions.ERROR:
      return _dbResultFn(state, { type, payload });
    default:
      return state;
  }
}
