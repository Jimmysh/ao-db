import { Map, OrderedMap, Set } from 'immutable';

import { Action } from '@ngrx/store';
import { DBHelper } from './db-helper';

// 任务状态
export enum TaskState {
  Default,
  Complete,
  Inactive,
  Active,
  Failed,
  Delayed
}

// 任务类型
export interface ITask {
  ok: boolean;
  state: TaskState;
  progress: number;
  action: Action | undefined;
  success: any;
  error: any;
}

// 收集器接口
export interface ICollectionStore {
  ids: Set<string>;
  entities: Map<string, any>;
  tasks: OrderedMap<number, ITask>;
}
// Database 接口
export interface IDatabase {
  getTable<T>(name: string): DBHelper<T>;
}
