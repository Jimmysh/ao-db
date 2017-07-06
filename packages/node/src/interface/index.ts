import { ICollectionOptions } from 'ao-db-core'

export interface IUserCtx {
  username: string
  roles: string[]
}

export interface IDesignDoc<T = any> {
  validate_doc_update?: (newDoc: PouchDB.Core.Document<T>, oldDoc: PouchDB.Core.Document<T>, userCtx: IUserCtx, secObj: any) => void,
  views?: {
    [name: string]: {
      map: Function,
      reduce?: Function
    } | {
      map: {
        fields: {
          [name: string]: 'asc'
        }
      },
      reduce: '_count',
      options: {
        def: {
          fields: string[]
        }
      }
    }
  }
}

export interface IIndex {
  [name: string]: string
}

export interface IDesignDocs {
  [name: string]: IDesignDoc
}

export interface IACL {
  names: string[]
  roles: string[]
}

export interface ISecurity {
  admins: IACL
  members: IACL
}

export interface INodeCollectionOptions extends ICollectionOptions {
  design?: IDesignDocs
  index?: IIndex
  security?: ISecurity
}

export interface IAoDBNodeOptions {
  host?: string
  maxLive?: number
  maxSync?: number
  collections: INodeCollectionOptions[]
}
