/// <reference types="pouchdb-core" />

declare namespace PouchDB {
  interface Database<Content extends {} = {}> {
    getSecurity(): Promise<any>
    putSecurity(secObj): Promise<any>
  }
}

declare module 'pouchdb-security' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
