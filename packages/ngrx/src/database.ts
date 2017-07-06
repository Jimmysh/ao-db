import { DBHelper } from './db-helper';

/**
 * Database 抽象类
 * 用来注入用
 * @export
 * @class Database
 */
export abstract class Database {
  public getTable<T>(name: string): DBHelper<T> {
    return null as any;
  }
}
