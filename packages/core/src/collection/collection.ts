import { ICollectionOptions, INeedSync, ISyncData, SyncType } from '../interface';
import { assign, cloneDeep, compact, forEach, get, has, isEqual, pickBy, set } from 'lodash';
import { changeSyncOptionsToLive, isLiveOptions, normalizeCollectionSettings } from '../util';

import { AoDB } from '../ao-db-core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IRelationship } from '../interface/model';
import { IValidateFunction } from '../interface/validator';
import { Observable } from 'rxjs/Observable';
import { PouchDB } from '../pouch-db';
import { PouchDBHelper } from '../pouch-db-helper';
import { Subject } from 'rxjs/Subject';

/**
 * 数据集合
 *
 * @export
 * @class Collection
 * @template T
 * @template any
 */
export class Collection<T = any> {
  // 本地数据库
  readonly local: PouchDBHelper<T>;
  // 远程数据库
  readonly remote: PouchDBHelper<T>;
  // 记录关系表
  readonly relationModel: { [name: string]: IRelationship } = {};
  readonly relationColls: { [name: string]: Collection<any> } = {};
  // 同步配置
  syncOptions: PouchDB.Replication.SyncOptions;
  // 同步信息
  readonly sync$: Observable<ISyncData>;

  // 需要同步
  readonly needSync$: Observable<INeedSync>;
  // 需要 live 同步
  readonly needLiveSync$: Observable<INeedSync>;

  // live 同步任务
  private _liveSync: PouchDB.Replication.Sync<T>;
  private readonly _needSyncSub: BehaviorSubject<any>;
  private readonly _needLiveSyncSub: Subject<any>;

  // 验证器
  private readonly _validator?: IValidateFunction;

  // 同步 subject
  private readonly _syncSub: BehaviorSubject<ISyncData> = new BehaviorSubject({ type: 'init' });
  // 数据库同步类型
  private readonly _syncType: SyncType = SyncType.Full;
  // 写入DB
  private readonly _writeDB: PouchDBHelper<T>;
  // 读取DB
  private readonly _readDB: PouchDBHelper<T>;

  constructor(
    private db: AoDB,
    public config: ICollectionOptions
  ) {
    normalizeCollectionSettings(this.db.config, config);
    // 普通 sync 请求
    this._needSyncSub = new BehaviorSubject(null);
    this.needSync$ = this._needSyncSub.asObservable();

    // live 同步请求
    this._needLiveSyncSub = new Subject();
    this.needLiveSync$ = this._needLiveSyncSub.asObservable();

    // 初始化同步信息订阅
    this.sync$ = this._syncSub.asObservable();

    if (config.model && AoDB.validateHelper) {
      AoDB.validateHelper.register(config.id, config.model);
    }

    if (config.local) {
      this.local = new PouchDBHelper(config.local);
      this.local.validator = this._validator;
    }

    if (config.remote) {
      this.remote = new PouchDBHelper(config.remote);
      this.remote.validator = this._validator;
    }

    switch (this._syncType) {
      case SyncType.Full:
        this._writeDB = this.remote || this.local;
        this._readDB = this.local || this.remote;
        break;
    }
    this.relationModel = pickBy(config.model!, (v, key) => v.collection || v.model) as any;
    this._initSync();
  }

  // 写入
  async create(doc: PouchDB.Core.PostDocument<T>): Promise<PouchDB.Core.Response>;
  async create(doc: PouchDB.Core.PutDocument<T>): Promise<PouchDB.Core.Response> {
    return this._writeDB.create(doc).then(d => { this.makeNeedSync(); return d; });
  }

  // 写入多个
  async createEach(doc: PouchDB.Core.PostDocument<T>[]): Promise<PouchDB.Core.Response[]>;
  async createEach(doc: PouchDB.Core.PutDocument<T>[]): Promise<PouchDB.Core.Response[]> {
    return this._writeDB.createEach(doc).then(d => { this.makeNeedSync(); return d; });
  }

  // 更新
  async update(doc: PouchDB.Core.PutDocument<T>) {
    return this._writeDB.update(doc).then(d => { this.makeNeedSync(); return d; });
  }

  // 通过 id 获得
  get(docId: PouchDB.Core.DocumentId, options?: PouchDB.Core.GetOpenRevisions | PouchDB.Core.GetOptions) {
    if (options) {
      return this._readDB.get(docId, options);
    } else {
      return this._readDB.get(docId);
    }
  }

  // 查找
  find(req: PouchDB.Find.FindRequest<T>) {
    return this._readDB.find(req);
  }

  // 找一个
  findOne(req: PouchDB.Find.FindRequest<T>) {
    return this._readDB.findOne(req);
  }

  // 更新或是创建
  async updateOrCreate(id: string, doc: PouchDB.Core.PutDocument<T>) {
    const updateOrCreate = await this._writeDB.updateOrCreate(id, doc);
    let local: any;
    try {
      local = await this._readDB.get(id);
    } catch (e) {
      local = null;
    }
    const isSameWithLocal = local && (local._rev === updateOrCreate.rev);

    if (!isSameWithLocal) {
      this.makeNeedSync();
    }

    return updateOrCreate;
  }

  // 判断 find 条件是否能找到数据
  exist(selector: PouchDB.Find.Selector) {
    return this._readDB.exist(selector);
  }

  // 标记本数据库需要同步
  makeNeedSync() {
    if (this.syncOptions) {
      this._needSyncSub.next({ id: this.config.id, date: Date.now() });
    }
  }

  // 标记本数据库需要实时同步
  makeNeedLiveSync() {
    if (this.syncOptions) {
      this._needLiveSyncSub.next({ table: this.config.id, date: Date.now() });
    }
  }

  // 执行一次同步
  sync(pid?: string) {
    if (this.syncOptions) {
      return this._getSyncFn(this.syncOptions, false, pid);
    } else {
      return Promise.reject({ error: '没有 syncOptions' });
    }
  }

  // 尝试开始实时同步
  liveSyncStart() {
    if (!this.syncOptions) {
      throw { error: 'syncOptions 错误' };
    }
    this.liveSyncStop();
    this._liveSync = this._getSyncFn(this.syncOptions, true);
  }

  // 尝试暂停实时同步
  liveSyncStop() {
    if (this._liveSync) {
      this._liveSync.cancel();
    }
  }

  /**
   *  得到同步的方法
   * @param options 配置
   * @param canLive 是否可以使用 pouchdb live
   * @param id 用来判断筛选的 id
   */
  private _getSyncFn(options: PouchDB.Replication.SyncOptions, live: boolean, pid?: string) {
    if (!this.local || !this.remote || this.local === this.remote) {
      throw { error: '本地或远程数据库配置错误' };
    }
    const opt = changeSyncOptionsToLive(options, live);
    const sync = this.local.sync(this.remote, opt);
    this._setSyncListener(sync, pid);
    return sync;
  }

  /**
   * 侦听同步信息变化
   *
   * @private
   * @param {PouchDB.Replication.Sync<T>} sync
   *
   * @memberof Collection
   */
  private _setSyncListener(sync: PouchDB.Replication.Sync<T>, pid?: string) {
    const def: any = {
      id: this.config.id
    };
    if (pid) {
      def.pid = pid;
    }
    sync.on('change', data => this._syncSub.next(assign({}, def, { type: 'change', data })));
    sync.on('paused', error => this._syncSub.next(assign({}, def, { type: 'paused', error })));
    sync.on('active', () => this._syncSub.next(assign({}, def, { type: 'active', })));
    sync.on('denied', error => this._syncSub.next(assign({}, def, { type: 'denied', error })));
    sync.on('complete', data => this._syncSub.next(assign({}, def, { type: 'complete', data })));
    sync.on('error', error => this._syncSub.next(assign({}, def, { type: 'error', error })));
  }

  // 初始化 sync 配置
  private _initSync() {
    const opt: any = get(this.config, 'sync.options');
    if (!opt) return;
    this.syncOptions = opt;
    if (isLiveOptions(opt)) {
      this.makeNeedLiveSync();
    } else {
      this.makeNeedSync();
    }
  }
}
