import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Actions, Effect } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { DBResultActions } from './db-result-actions';
import { DBTaskActions } from './db-task-actions';
import { Database } from './database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { cloneDeep } from 'lodash';
import { getActionHashCode } from './db-util';
import { of } from 'rxjs/observable/of';

/**
 * DB 副作用处理
 */
@Injectable()
export class DBEffects {

  // 获得 单个 id
  @Effect()
  public getIdTask$ = this.actions$
    .ofType(DBTaskActions.GET_ID)
    .map((d: any) => this._getActionBasicData(d))
    .mergeMap(({ payload, table, db, hashCode }) =>
      Observable
        .fromPromise(db.coll.get(payload.id))
        .map((d: any) => this.result.successWithDocs(table, hashCode, d))
        .catch((error: any) => of(this.result.error(table, hashCode, error)))
    );

  // 获得 多个 id 结果
  @Effect()
  public getIdsTask$ = this.actions$
    .ofType(DBTaskActions.GET_IDS)
    .map((d: any) => this._getActionBasicData(d))
    .mergeMap(({ payload, table, db, hashCode }) =>
      Observable
        .fromPromise(db.coll.find({
          selector: {
            _id: {
              $in: payload.ids
            }
          }
        }))
        .map((d: any) => this.result.successWithDocs(table, hashCode, d.docs))
        .catch((error: any) => of(this.result.error(table, hashCode, error)))
    );

  // 处理 find
  @Effect()
  public findTask$ = this.actions$
    .ofType(DBTaskActions.FIND)
    .map((d: any) => this._getActionBasicData(d))
    .mergeMap(({ payload, table, db, hashCode }) =>
      Observable
        .fromPromise(db.coll.find(payload.request))
        .map((d: any) => this.result.successWithDocs(table, hashCode, d.docs))
        .catch((error: any) => of(this.result.error(table, hashCode, error)))
    );

  // 处理 findOne
  @Effect()
  public findOneTask$ = this.actions$
    .ofType(DBTaskActions.FIND_ONE)
    .map((d: any) => this._getActionBasicData(d))
    .mergeMap(({ payload, table, db, hashCode }) =>
      Observable
        .fromPromise(db.coll.findOne(payload.request))
        .map((doc: any) => this.result.successWithDocs(table, hashCode, doc))
        .catch((error: any) => of(this.result.error(table, hashCode, error)))
    );

  // 处理 updateOrCreate
  @Effect()
  public updateOrCreateTask$ = this.actions$
    .ofType(DBTaskActions.UPDATE_OR_CREATE)
    .map((d: any) => this._getActionBasicData(d))
    .mergeMap(({ payload, table, db, hashCode }) =>
      Observable
        .fromPromise(db.coll.updateOrCreate(payload.doc._id, payload.doc))
        .map((doc: any) => this.result.writeSuccess(table, hashCode, doc))
        .catch((error: any) => of(this.result.error(table, hashCode, error)))
    );

  // 处理 update
  @Effect()
  public updateTask$ = this.actions$
    .ofType(DBTaskActions.UPDATE)
    .map((d: any) => this._getActionBasicData(d))
    .mergeMap(({ payload, table, hashCode, db }) =>
      Observable
        .fromPromise(db.coll.update(payload.doc))
        .map((doc: any) => this.result.writeSuccess(table, hashCode, doc))
        .catch((error: any) => of(this.result.error(table, hashCode, error)))
    );

  // 处理 create
  @Effect()
  public createTask$ = this.actions$
    .ofType(DBTaskActions.CREATE)
    .map((d: any) => this._getActionBasicData(d))
    .mergeMap(({ payload, table, db, hashCode }) =>
      Observable
        .fromPromise(db.coll.create(payload.doc))
        .map((doc: any) => this.result.writeSuccess(table, hashCode, doc))
        .catch((error: any) => of(this.result.error(table, hashCode, error)))
    );

  // 处理 createEach
  @Effect()
  public createEachTask$ = this.actions$
    .ofType(DBTaskActions.CREATE_EACH)
    .map((d: any) => this._getActionBasicData(d))
    .mergeMap(({ payload, table, db, hashCode }) =>
      Observable
        .fromPromise(db.coll.createEach(payload.docs))
        .map((docs: any) => this.result.writeSuccess(table, hashCode, docs))
        .catch((error: any) => of(this.result.error(table, hashCode, error)))
    );

  constructor(
    private actions$: Actions,
    private task: DBTaskActions,
    private result: DBResultActions,
    private db: Database
  ) {
  }
  private _getActionBasicData(action: Action) {
    const payload = cloneDeep(action.payload);
    const table: string = payload.table;
    const db = this.db.getTable(table);
    const hashCode = getActionHashCode(action);
    return { payload, table, db, hashCode };
  }
}
