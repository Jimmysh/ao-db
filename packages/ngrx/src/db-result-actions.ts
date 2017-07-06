import { Injectable } from '@angular/core';
import { pick } from 'lodash';

/**
 * 生成结果 action
 *
 * @export
 * @class DBResultActions
 */
@Injectable()
export class DBResultActions {
  public static DOC: string = 'DB_RESULT_DOC';
  public static DOCS: string = 'DB_RESULT_DOCS';
  public static WRITE_SUCCESS: string = 'DB_RESULT_WRITE_SUCCESS';
  public static SUCCESS_WITH_DOC: string = 'DB_RESULT_SUCCESS_WITH_DOC';
  public static ERROR: string = 'DB_RESULT_ERROR';

  public static readonly ALL_RESULT: string[] = [
    DBResultActions.DOC,
    DBResultActions.DOCS,
    DBResultActions.WRITE_SUCCESS,
    DBResultActions.ERROR,
    DBResultActions.SUCCESS_WITH_DOC
  ];

  public static isResult(name: string) {
    return this.ALL_RESULT.indexOf(name) !== -1;
  }

  // doc 数组, 单个 table 返回的结果
  public docs(table: string, docs: any[]) {
    return {
      type: DBResultActions.DOC,
      payload: { table, docs }
    };
  }

  // 成功 task 信息
  public writeSuccess(
    table: string,
    hashCode: number,
    docs: PouchDB.Core.Response | PouchDB.Core.Response[]
  ) {
    return {
      type: DBResultActions.WRITE_SUCCESS,
      payload: { table, hashCode, docs }
    };
  }

  // 失败 task 信息
  public error(table: string, hashCode: number, error: any) {
    return {
      type: DBResultActions.ERROR,
      payload: { table, hashCode, error: pick(error, ['name', 'message', 'status']) }
    };
  }

  // 成功并返回真实数据
  public successWithDocs(table: string, hashCode: number, docs: any) {
    return {
      type: DBResultActions.SUCCESS_WITH_DOC,
      payload: { table, hashCode, docs }
    };
  }
}
