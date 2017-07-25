import { IModel, IRelationship, SyncType } from '../interface';
import { assign, filter, forEach, has, isEqual, omit, pickBy } from 'lodash';

import { AoDB } from '../ao-db-core';
import { Collection } from '../collection';
import { ViewCollection } from './view-collection';
import { getViewConfig } from './get-view-config';

export class View<T> {
  // view 的收集器
  collection: ViewCollection<any>;

  constructor(
    private db: AoDB,
    private _coll: Collection<any>
  ) {
    const viewConfig = getViewConfig(this._coll.config);
    this.collection = new ViewCollection(this.db, viewConfig);
  }

  // 检查 id 的数据并更新 view 数据
  async check(id: string) {
    const remoteData = await this._coll.remote.get(id);
    const data: any = await this._getRelationsData(this._coll, remoteData);
    let realData;
    try {
      realData = await this.collection.remote.get(id);
    } catch (error) {
      //
    }
    if (realData) {
      if (this._isEqual(realData, data)) {
        //
      } else {
        await this.collection.update(assign(realData, data));
      }
    } else {
      const cd = await this.collection.create(data);
    }
    return data;
  }

  private async _getRelationData(coll: Collection<any>, data: any, name: string) {
    const relation = coll.relationModel[name];
    if (relation.model && relation.insert) {
      // 一对一需要嵌入
      const modelColl = this.db.collection.colls[relation.model];
      let oneToOneInsert = await modelColl.remote.get(data[name]);
      oneToOneInsert = await this._getRelationsData(modelColl, oneToOneInsert);
      data[name] = omit(oneToOneInsert, ['_rev', '_id']);

    } else if (relation.collection) {
      const { model, config, id, tableName } = this.db.collection.getRelationConfig(coll, relation, name);
      if (model.collection) {
        // 多对多关系
        const manyToManyData = await this.db.collection.get(id).remote
          .find({
            selector: {
              [relation.via]: data['_id']
            }
          });

        const ids = manyToManyData.docs.map((doc: any) => doc[model.via]);
        data[name] = ids;
      } else {
        const manyColl = this.db.collection.colls[relation.collection];
        // 一对多关系
        const oneToManyData = await manyColl.remote
          .find({
            selector: {
              [relation.via]: data['_id']
            }
          });

        const pk = relation.pk || '_id';
        let backData: { keys: string[], map: { [k: string]: any } } = {
          keys: [],
          map: {}
        };

        for (let i = 0; i < oneToManyData.docs.length; i++) {
          let doc = oneToManyData.docs[i];
          const key = doc[pk];
          backData.keys.push(key);
          doc = await this._getRelationsData(manyColl, doc);
          backData.map[key] = omit(doc, ['_rev', '_id', model.via, pk]);
        }
        data[name] = backData;
      }
    }
    return data;
  }

  /**
   * 计算关系数据
   *
   * @private
   * @param {*} data
   * @param {{ [name: string]: IRelationship }} relations
   * @returns
   * @memberof View
   */
  private async _getRelationsData(coll: any, data: any) {
    for (let name in coll.relationModel) {
      data = await this._getRelationData(coll, data, name);
    }
    return omit(data, ['_rev']);
  }

  private _isEqual(real: any, data: any) {
    const d1 = omit(real, ['_rev', '_id']);
    const d2 = omit(data, ['_rev', '_id']);
    return isEqual(d1, d2);
  }
}
