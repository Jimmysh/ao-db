import { IAoDBOptions, ICollectionOptions, INeedSync, ISyncData, IUser, confDefault } from './interface'
import { assign, forEach } from 'lodash'

import { Collection } from './collection'
import { CollectionPlugin } from './collection'
import { IModelValidateHelper } from './interface/validator'
import { Observable } from 'rxjs/Observable'
import { SyncPlugin } from './sync'
import { ViewPlugin } from './view'
import { normalizeSettings } from './util'

export class AoDB {

  // 标准插件
  static validateHelper?: IModelValidateHelper

  // 当前用户信息
  currentUser: IUser

  // 同步信息
  readonly sync$: Observable<any>
  // 当前配置
  readonly config: IAoDBOptions
  // Plugin
  readonly collection: CollectionPlugin
  readonly sync: SyncPlugin
  readonly view: ViewPlugin

  constructor(settings: IAoDBOptions) {

    // 标准化配置信息
    this.config = normalizeSettings(assign({}, confDefault, settings))
    // plugin
    this.collection = new CollectionPlugin(this)
    this.sync = new SyncPlugin(this)
    this.view = new ViewPlugin(this)

    // 默认
    this.sync$ = this.sync.sync$
  }

  /**
   * 设置 token
   *
   * @param {string} [token]
   * @param {string} [type='Basic']
   *
   * @memberof AoDB
   */
  token(token?: string, type: string = 'Basic') {
    forEach(this.collection.colls, v => {
      if (v.remote) {
        v.remote.token = token ? `${type} ${token}` : ''
      }
    })
  }
}
