import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';

/**
 * 生成任务 action
 *
 * @export
 * @class DBTaskActions
 */
@Injectable()
export class DBTaskActions {

  // 查询方法
  public static GET_ID: string = 'DB_TASK_GET_ID';
  public static GET_IDS: string = 'DB_TASK_GET_IDS';
  public static FIND: string = 'DB_TASK_FIND';
  public static FIND_ONE: string = 'DB_TASK_FIND_ONE';
  public static UPDATE_OR_CREATE: string = 'DB_TASK_UPDATE_OR_CREATE';
  public static UPDATE: string = 'DB_TASK_UPDATE';
  public static REMOVE: string = 'DB_TASK_REMOVE';
  public static CREATE: string = 'DB_TASK_CREATE';
  public static CREATE_EACH: string = 'DB_TASK_CREATE_EACH';

  public static readonly ALL_TASK: string[] = [
    DBTaskActions.GET_ID,
    DBTaskActions.GET_IDS,
    DBTaskActions.FIND,
    DBTaskActions.FIND_ONE,
    DBTaskActions.UPDATE_OR_CREATE,
    DBTaskActions.UPDATE,
    DBTaskActions.REMOVE,
    DBTaskActions.CREATE,
    DBTaskActions.CREATE_EACH
  ];

  public static is(name: string) {
    return this.ALL_TASK.indexOf(name) !== -1;
  }

  public getId(table: string, id: string): Action {
    return {
      type: DBTaskActions.GET_ID,
      payload: { table, id }
    };
  }

  public getIds(table: string, ids: string[]): Action {
    return {
      type: DBTaskActions.GET_IDS,
      payload: { table, ids }
    };
  }

  public remove(table: string, ids: string[]): Action {
    return {
      type: DBTaskActions.REMOVE,
      payload: { table, ids }
    };
  }

  public find(table: string, request: PouchDB.Find.FindRequest<any>): Action {
    return {
      type: DBTaskActions.FIND,
      payload: { table, request }
    };
  }

  public findOne(table: string, request: PouchDB.Find.FindRequest<any>): Action {
    return {
      type: DBTaskActions.FIND_ONE,
      payload: { table, request }
    };
  }

  public updateOrCreate(table: string, doc: { _id: string, [x: string]: any }) {
    return {
      type: DBTaskActions.UPDATE_OR_CREATE,
      payload: { table, doc, id: doc._id }
    };
  }

  public update(table: string, doc: { _id: string, [x: string]: any }) {
    delete doc._revisions;
    return {
      type: DBTaskActions.UPDATE,
      payload: { table, doc, id: doc._id }
    };
  }

  public create(table: string, doc: { [x: string]: any }) {
    return {
      type: DBTaskActions.CREATE,
      payload: { table, doc }
    };
  }

  public createEach(table: string, docs: any[]) {
    return {
      type: DBTaskActions.CREATE_EACH,
      payload: {
        table,
        docs
      }
    };
  }
}
