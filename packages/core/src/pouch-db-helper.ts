import { assign, clone, get, isEqual, map } from 'lodash';

import { IValidateFunction } from './interface/validator';
import { PouchDB } from './pouch-db';

export class PouchDBHelper<T> extends PouchDB<T> {

  // 验证函数
  validator?: IValidateFunction;

  // 登录的token
  token: string;

  constructor(options?: any) {
    super(options.name, options);
    // 修改 _ajax 让 请求同步包含 token
    const ajax: Function = this['_ajax'];
    if (ajax) {
      this['_ajax'] = (opt, callback) => {
        if (this.token) {
          opt.headers['Authorization'] = this.token;
        }
        ajax(opt, callback);
      };
    }
  }

  // 验证数据
  guard(...value: T[]) {
    if (this.validator) {
      const pall = map(value, d => {
        return this.validator!(d);
      });
    }
    return Promise.resolve(value);
  }

  async updateOrCreate(id: string, doc: PouchDB.Core.PutDocument<T>): Promise<PouchDB.Core.Response> {
    doc._id = id;
    try {
      const find = await this.get(id);
      const newDoc: any = assign({}, find, doc);
      const needUpdate = !isEqual(find, newDoc);
      if (needUpdate) {
        return this.update(newDoc);
      } else {
        // 返回成功信息 不返回实体
        return { id: find._id, ok: true, rev: find._rev } as PouchDB.Core.Response;
      }
    } catch (error) {
      return this.create(doc);
    }
  }

  // 创建数据
  async create(doc: PouchDB.Core.PostDocument<T>): Promise<PouchDB.Core.Response>;
  async create(doc: PouchDB.Core.PutDocument<T>): Promise<PouchDB.Core.Response> {
    await this.guard(doc);
    if (doc._id) {
      return this.put(doc);
    } else {
      return this.post(doc);
    }
  }

  // 批量创建数据
  async createEach(doc: PouchDB.Core.PostDocument<T>[]): Promise<PouchDB.Core.Response[]>;
  async createEach(doc: PouchDB.Core.PutDocument<T>[]): Promise<PouchDB.Core.Response[]> {
    await this.guard(...doc);
    return this.bulkDocs(doc);
  }

  // 更新数据
  async update(doc: PouchDB.Core.PutDocument<T>) {
    await this.guard(doc);
    return this.put(doc);
  }

  // 查找一个数据
  findOne(req: PouchDB.Find.FindRequest<T>): Promise<PouchDB.Core.Document<T> & PouchDB.Core.GetMeta> {
    req.limit = 1;
    return this.find(req)
      .then(d => {
        if (d.docs.length > 0) {
          return d.docs[0];
        } else {
          return Promise.reject({ status: 404 }) as any;
        }
      });
  }

  async exist(selector: PouchDB.Find.Selector): Promise<boolean> {
    try {
      const find = await this.findOne({ selector });
      return true;
    } catch (e) {
      if (e.status === 404) {
        return false;
      } else {
        throw e;
      }
    }
  }
}
