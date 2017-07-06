import { ICollectionStore, ITask, TaskState } from './interface';
import { Map, OrderedMap, Record, Set } from 'immutable';

export const IDS: any = 'ids';
export const ENTITIES: any = 'entities';
export const RESULTS: any = 'results';

export const TaskRecord = Record<ITask>({
  ok: false,
  state: TaskState.Default,
  progress: 0,
  action: undefined,
  success: undefined,
  error: undefined
});

const DBState = Record<ICollectionStore>({
  ids: Set<string>(),
  entities: Map<string, any>(),
  tasks: OrderedMap<number, ITask>()
});

export const DBError = Record<any>({
  status: 0,
  name: undefined,
  message: undefined
});

export const dbState = new DBState();

export type makeOptional<T> = {
  [P in keyof T]?: T[P];
};

export function createTaskRecord(config: makeOptional<ITask> = {}) {
  return new TaskRecord(config);
}
export const defaultTaskRecord = new TaskRecord();

export function createDBError(error: { code?: number, error: any }) {
  return new DBError(error);
}
