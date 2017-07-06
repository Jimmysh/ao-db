import 'rxjs/add/operator/bufferWhen'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/withLatestFrom'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'

import { IAoDBOptions, INeedSync } from '../interface'
import { assign, compact, flattenDeep, forEach, get, has, isEmpty, isEqual, toArray } from 'lodash'

import { AoDB } from 'ao-db-core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { merge } from 'rxjs/Observable/merge'

export class SyncPlugin {

  // 同步信息
  readonly sync$: Observable<any>
  // 队列中
  readonly pending$: Observable<any>
  // 同步中
  readonly syncing$: Observable<any[]>

  private readonly _needSyncing$: Observable<any>
  private _pendingList: any[] = []
  private _syncingList: any[] = []

  // 下一个同步计算开关, next 就计算次
  private _nextSyncSub: Subject<any> = new Subject()
  private _nextSync$: Observable<any> = this._nextSyncSub.asObservable()

  constructor(
    private db: AoDB
  ) {

    // ---------------------------------------------------- [ 初始化 sync ]
    const collArr = toArray(db.collection.colls)
    this._needSyncing$ = merge(...collArr.map(d => d.needSync$))
    this.sync$ = merge(...collArr.map(coll => coll.sync$))

    // 把需求放到等待中
    this.pending$ = this._needSyncing$
      .bufferWhen(() => this._nextSync$)
      .map(d => compact(d))
      .map(need => {
        need.forEach(({ id, date }: any) => {
          const find = this._pendingList.find(d => d.id === id)
          if (find) {
            find.date = date
          } else {
            this._pendingList.push({ id, date })
          }
        })
        return this._pendingList
      })

    // pending 改变后 计算 syncing 的值
    this.syncing$ = this.pending$
      .filter(d => !isEmpty(d))
      .map(pending => {
        if (this.canSyncNum > 0) {
          // 赛选需要的更新
          const needPending = pending
            .filter(d => !this._syncingList.find(f => f.id === d.id))
          // 加入列表
          if (needPending.length > 0) {
            let needSyncing = needPending.splice(0, this.canSyncNum)
            this._pendingList = this._pendingList.filter(p => !needSyncing.find(s => s.id === p.id))
            this._syncingList = [...this._syncingList, ...needSyncing]
          }
        }
        return this._syncingList
      })

    // ---------------------------------------------------- [ 同步逻辑 ]
    // syncing 后掉用 coll.sync()
    this.syncing$
      .map(syncingArr => syncingArr.filter(c => !c.onSyncing))
      .subscribe(syncingArr => syncingArr.forEach(coll => {
        // 从 syncing 列表删除
        const _done = (error?: any) => {
          if (error) {
            // TODO: 错误处理
            console.error(error)
          }
          const index = this._syncingList.findIndex(s => s.id === coll.id)
          this._syncingList.splice(index, 1)
          this.makeNextSync()
        }

        coll.onSyncing = true
        const aaa = this.db.collection.get(coll.id)
        const sync: Promise<any> = this.db.collection.get(coll.id).sync('SYNC_MANAGER')
        sync.then(
          d => _done(),
          err => _done(err)
        )
      }))

    // ---------------------------------------------------- [ 触发同步计算 ]
    this._needSyncing$
      .filter(d => !isEmpty(d))
      .subscribe(d => this.makeNextSync())
  }

  // 计算一次
  makeNextSync() {
    if (this.canSyncNum > 0) {
      this._nextSyncSub.next()
    }
  }

  get canSyncNum() {
    return this.db.config.maxSync! - this._syncingList.length
  }
}
