import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

import { Action, Store } from '@ngrx/store';
import { AoDB, Collection, PouchDB } from 'ao-db-core';
import { ENTITIES, IDS, dbState, makeOptional } from './db-vars';
import { ITask, TaskState } from './interface';
import { Map, OrderedMap, Set, is } from 'immutable';
import { get, isEmpty, isString } from 'lodash';

import { DBResultActions } from './db-result-actions';
import { DBTaskActions } from './db-task-actions';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { getActionHashCode } from './db-util';
import { of } from 'rxjs/observable/of';

/**
 * db action 请求工具
 */
export class DBHelper<T> {
  public readonly entities$: Observable<Map<string, T>>;
  public readonly ids$: Observable<Set<string>>;
  public readonly tasks$: Observable<OrderedMap<number, ITask>>;

  private readonly _task: DBTaskActions;
  private readonly _result: DBResultActions;
  private readonly _change$: Observable<any>;
  private readonly _store: Store<any>;
  private readonly _db: AoDB;

  constructor(
    public readonly coll: Collection<T>,
    { store, db, task, result, storeName }: any
  ) {
    this._store = store;
    this._task = task;
    this._result = result;
    this._db = db;

    const id = this.coll.config.id;

    const db$ = this._store
      .map(state => state[storeName])
      .map(d => d.get(id) || dbState);

    this.entities$ = db$
      .map(d => d.get(ENTITIES))
      .distinctUntilChanged(is);

    this.ids$ = db$
      .map(d => d.get(IDS))
      .distinctUntilChanged(is);

    this.tasks$ = db$
      .map(d => d.get('tasks'))
      .distinctUntilChanged(is);


    // change
    this._change$ = this.coll.sync$
      .filter(d => d.type === 'change')
      .map(d => get(d, 'data.change.docs'))
      .filter(d => !isEmpty(d)) as any;

    // 默认执行
    this._change$.subscribe((docs: any[]) => this._store.dispatch(this._result.docs(id, docs)));
  }

  public get(id: string) {
    const action = this._task.getId(this.coll.config.id, id);
    return this._getId$(action);
  }

  public getIds(ids: string[]) {
    const action = this._task.getIds(this.coll.config.id, ids);
    return this._getIds$(action);
  }

  public find(request: PouchDB.Find.FindRequest<T>) {
    const action = this._task.find(this.coll.config.id, request);
    return this._getTaskResult$(action);
  }

  public findOne(request: PouchDB.Find.FindRequest<T>) {
    const action = this._task.findOne(this.coll.config.id, request);
    return this._getTaskResult$(action);
  }

  public updateOrCreate(doc: { _id: string } & PouchDB.Core.PutDocument<makeOptional<T>>) {
    const action = this._task.updateOrCreate(this.coll.config.id, doc);
    return this._getId$(action);
  }

  public update(doc: { _id: string } & PouchDB.Core.PutDocument<makeOptional<T>>) {
    const action = this._task.update(this.coll.config.id, doc);
    return this._getId$(action);
  }
  public create(doc: PouchDB.Core.PostDocument<T> | PouchDB.Core.PutDocument<T>) {
    const action = this._task.create(this.coll.config.id, doc);
    return this._getTaskResult$(action);
  }

  public remove(docId: string) {
    const action = this._task.remove(this.coll.config.id, [docId]);
    return this._getTaskResult$(action);
  }
  public createEach(docs: Array<PouchDB.Core.PostDocument<makeOptional<T>>> | Array<PouchDB.Core.PutDocument<makeOptional<T>>>) {
    const action = this._task.createEach(this.coll.config.id, docs);
    return this._getTaskResult$(action);
  }

  // 计算任务的结果
  private _getTaskResult$(action: Action): Observable<ITask> {
    const hashCode = getActionHashCode(action);
    return this.tasks$
      .map(d => d.get(hashCode))
      .do((task: any) => {
        if (!task) {
          this._store.dispatch(action);
        }
      })
      .filter(d => !!d)
      .switchMap((task: any) => {
        if (Set.isSet(task.success)) {
          return this.entities$
            .map(entity => task.success.map((id: string) => entity.get(id)))
            .map(d => d.findEntry((v: any) => v) ? d : undefined)
            .map(success => this._mergeEntity({ task, success }));
        } else if (isString(task.success)) {
          return this.entities$
            .map(entity => entity.get(task.success))
            .map(success => this._mergeEntity({ task, success }));
        } else {
          return of(task);
        }
      })
      .distinctUntilChanged(is);
  }

  // 计算 getid 任务结果
  private _getId$(action: Action): Observable<ITask> {
    const hashCode = getActionHashCode(action);
    const id = action.payload.id;
    return combineLatest(
      this.entities$.map(entity => entity.get(id)),
      this.tasks$.map(d => d.get(hashCode)),
      (success: any, task: any) => {
        if (!task) {
          this._store.dispatch(action);
        }
        return { task, success };
      }
    )
      .filter(d => d.task)
      .map(this._mergeEntity)
      .distinctUntilChanged(is);
  }

  // 计算 getid 任务结果
  private _getIds$(action: Action): Observable<ITask> {
    const hashCode = getActionHashCode(action);
    const ids = Set(action.payload.ids);
    return combineLatest(
      this.entities$.map(entity => ids.map((id: any) => entity.get(id)).filter((d: any) => d)),
      this.tasks$.map(d => d.get(hashCode)),
      (success, task: any) => {
        if (!task) {
          this._store.dispatch(action);
        }
        return { task, success };
      }
    )
      .filter(d => d.task)
      .map(this._mergeEntity)
      .distinctUntilChanged(is);
  }

  private _mergeEntity({ task, success }: any) {
    const isOK = success && success.size;
    return task.merge({
      ok: isOK ? true : false,
      state: isOK ? TaskState.Complete : TaskState.Active,
      success: isOK ? success : undefined,
      progress: isOK ? 1 : 0
    });
  }
}
