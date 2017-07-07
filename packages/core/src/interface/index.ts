import { IModel } from './model';
import { PouchDB } from '../pouch-db';

export interface IAoDBOptions {
  host?: string;
  maxLive?: number;
  maxSync?: number;
  collections: ICollectionOptions[];
}
// 默认配置
export const confDefault = {
  maxLive: 5, // 最大保持在线同步 table 数
  maxSync: 8  // 最大同时同步 table 数
};

export interface IUser {
}

export interface INeedSync {
  id: string;
  date: number;
}

export interface ISyncData {
  type: string;
  id?: string;
  pid?: string;
  data?: any;
  error?: any;
}

export enum SyncType {
  Full,
  Filter,
  Query
}

export type IRemoteDBConfig = PouchDB.Configuration.RemoteDatabaseConfiguration;
export type ILocalDBConfig = PouchDB.Configuration.LocalDatabaseConfiguration;
export type SyncOpt = PouchDB.Replication.ReplicateOptions & { selector?: PouchDB.Find.Selector };
export interface ICollectionOptions {
  id: string;
  view?: boolean;
  model?: IModel;
  remote?: IRemoteDBConfig;
  local?: ILocalDBConfig;
  sync?: {
    type: SyncType,
    options: SyncOpt & {
      pull?: SyncOpt,
      push?: SyncOpt
    }
  };
}

export interface IViewOptions {
}

export * from './model';
export * from './validator';
