import { chain, difference, forEach, forIn, get, isArray, isEqual, set } from 'lodash';

import { AoDBNode } from '../ao-db-node';
import { INodeCollectionOptions } from '../interface';
import { functionToString } from '../util/fuction-to-string';
import { minify } from 'uglify-js';

function getIndexDoc(k, v) {
  return {
    fields: isArray(v) ? v : [v],
    ddoc: `idx-${k}`,
    name: k,
    type: 'json'
  };
}

export class IndexPlugin {
  constructor(
    private db: AoDBNode
  ) {
    this.db.config.collections
      .forEach(async opt => {
        try {
          await this.sync(opt.id);
        } catch (error) {
          console.log('[IndexPlugin]', error);
        }
      });
  }

  async sync(id: string) {
    const db = this.db.collection.get(id);
    const config: INodeCollectionOptions = db.config;
    if (!config.index) {
      return;
    }

    const dbGetIds = await db.remote.getIndexes();
    const ids = chain(dbGetIds.indexes)
      .filter(d => d.ddoc)
      .map(d => d.ddoc)
      .value();

    const needIds = chain(config.index)
      .keys()
      .map(d => `_design/idx-${d}`)
      .value();

    const needDeleteIds: string[] = difference(ids, needIds) as any;

    forEach(needDeleteIds, async (id: string) => {
      const doc = dbGetIds.indexes.find((d: any) => d.ddoc === id);
      if (doc) {
        try {
          await db.remote.deleteIndex({ name: doc.name, ddoc: doc.ddoc as string });
          console.info('删除成功', doc.ddoc);
        } catch (error) {
          console.error('deleteIds error', error);
        }
      }

    });

    forIn(config.index, async (v, k) => {
      const id = `_design/idx-${k}`;
      try {
        const doc = await db.remote.get(id);
        const fieldArrPath = `views.${k}.options.def.fields`;
        const fieldArr = isArray(v) ? v : [v];
        const needUpdate = !isEqual(get(doc, fieldArrPath), fieldArr);
        if (needUpdate) {
          console.log('更新', k, v);
          const fieldObjPath = `views.${k}.map.fields`;
          const fieldObj = {};
          forEach(fieldArr, n => fieldObj[n] = 'asc');
          set(doc, fieldArrPath, fieldArr);
          set(doc, fieldObjPath, fieldObj);
          await db.remote.put(doc);
        }
      } catch (e) {
        const index = getIndexDoc(k, v);
        try {
          await db.remote.createIndex({ index });
          console.info('创建成功', index);
        } catch (error) {
          console.error('create Index', error);
        }
      }
    });
  }
}
