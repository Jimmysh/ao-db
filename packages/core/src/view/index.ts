import { AoDB } from '../ao-db-core';
import { IViewOptions } from '../interface';
import { View } from './view';
import { forEach } from 'lodash';
/**
 * 数据视图
 *
 * @export
 * @class View
 * @template T
 * @template any
 */
export class ViewPlugin<T = any> {
  private _views: { [name: string]: any } = {};
  constructor(
    private db: AoDB
  ) {
    forEach(this.db.collection.colls, d => {
      if (d.config.view) {
        this._views[d.config.id] = new View(db, d);
      }
    });
  }
  get<T = any>(id: string) {
    return this._views[id] as View<T>;
  }
}
