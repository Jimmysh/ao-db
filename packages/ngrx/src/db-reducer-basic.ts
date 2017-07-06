import { Action } from '@ngrx/store';
import { dbState } from './db-vars';

/**
 * 处理 DB 的默认 actions
 *
 * @export
 * @param {*} state
 * @param {Action} { type, payload }
 * @returns
 */
export function dbBasic(state: any, { type, payload }: Action) {
  // 一些默认值
  const TABLE: string = payload && payload.table;
  if (!TABLE) {
    return state;
  }
  let db = dbState;
  const getDb = state.get(TABLE);
  if (getDb) {
    db = getDb;
  }
  return state.set(TABLE, db);
}
