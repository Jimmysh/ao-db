import { Action } from '@ngrx/store';
import { DBActions } from './db-actions';
import { DBResultActions } from './db-result-actions';
import { DBTaskActions } from './db-task-actions';
import { Map } from 'immutable';
import { dbBasic } from './db-reducer-basic';
import { dbResult } from './db-reducer-result';
import { dbTask } from './db-reducer-task';

const initialState = Map<string, any>();

export function DBReducer(state = initialState, { type, payload }: Action) {
  if (DBTaskActions.is(type)) {
    return dbTask(state, { type, payload });
  } else if (DBResultActions.isResult(type)) {
    return dbResult(state, { type, payload });
  } else if (DBActions.is(type)) {
    return dbBasic(state, { type, payload });
  } else {
    return state;
  }
}
