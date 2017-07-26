import * as PouchDB from 'pouchdb-node';

let db = {};

function getDB(name: string): any {
  if (!db[name]) {
    db[name] = new PouchDB(name);
  }
  return db[name];
}

export async function pouchDBImport(name: any, ...docs: any[]) {
  const db = getDB(name);
  return await db.bulkDocs(docs);
}
