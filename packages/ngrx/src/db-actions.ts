import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';

/**
 * 数据库主 action
 *
 * @export
 * @class DBActions
 */
@Injectable()
export class DBActions {

  public static readonly SYNC_LEADER: string = 'DB_SYNC_LEADER';

  public static readonly SUPPORT_TYPE: string[] = [
    DBActions.SYNC_LEADER
  ];

  public static is(name: string) {
    return this.SUPPORT_TYPE.indexOf(name) !== -1;
  }

  /**
   * 当前数据库作为同步 leader
   *
   * @returns {Action}
   * @memberof DBActions
   */
  public syncLeader(): Action {
    return {
      type: DBActions.SYNC_LEADER,
      payload: {}
    };
  }
}
