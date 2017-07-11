import { forEach, sortBy } from 'lodash';

import { AoDB } from 'ao-db-core';
import { Collection } from './collection';
import { ICollectionOptions } from '../interface';
import { IRelationship } from '../interface/model';
import { SyncType } from '../interface';

export { Collection } from './collection';

export class CollectionPlugin {

  // 收集器列表
  private _colls: { [name: string]: Collection<any> } = {};
  private _tables: { [name: string]: Collection<any> } = {};
  constructor(
    private db: AoDB
  ) {
    this.db.config.collections.forEach(opt => this.create(opt));
    // 创建记录关系数据库
    forEach(this._colls, (coll, id) => {
      forEach(coll.relationModel, (relationship: IRelationship, attrName) => {
        if (relationship.collection) {
          const { model, config, id, tableName } = this.getRelationConfig(coll, relationship, attrName);
          if (model.collection) {
            const relationModel: any = {
              [attrName]: {
                type: 'string'
              },
              [relationship.via]: {
                type: 'string'
              }
            };
            const relationConf: ICollectionOptions = {
              id,
              local: {
                name: tableName
              },
              remote: {
                name: tableName
              },
              model: relationModel,
              sync: {
                type: SyncType.Full,
                options: {
                }
              }
            };
            coll.relationColls[attrName] = this.create(relationConf);
          }
        }
      });
    });
  }

  get colls() {
    return this._colls;
  }

  create(config: ICollectionOptions) {
    let coll = this._colls[config.id];
    let localName;
    if (config.local && config.local.name) {
      localName = config.local.name;
    }

    if (!coll && localName) {
      coll = this._tables[localName];
      if (coll) {
        this._colls[config.id] = coll;
      }
    }

    if (!coll) {
      coll = new Collection(this.db, config);
      this._colls[config.id] = coll;
      if (localName) {
        this._tables[localName] = coll;
      }
    }

    return coll;
  }

  get<T = any>(id: string): Collection<T> {
    return this._colls[id];
  }

  // 找到收集的 model 配置
  getRelationConfig(coll: Collection<any>, relationship: any, attrName: string) {
    const config = this._colls[relationship.collection].config;
    const model: any = config.model![relationship.via];
    let id;
    let tableName;
    if (model.collection) {
      id = `${coll.config.id}.${attrName}`;
      const id2 = `${config.id}.${relationship.via}`;
      tableName = 'relation_' + (model.through || sortBy([id, id2]).join('__'));
    }
    return { model, config, id, tableName };
  }
}
