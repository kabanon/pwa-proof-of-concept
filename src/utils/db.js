import * as RxDB from 'rxdb';
import { DB_SCHEMA_CRM_COMPANY, DB_SCHEMA_CRM_PEOPLE } from './db_schema'

RxDB.plugin(require('pouchdb-adapter-idb'));

const dbName = 'crm';
let dbPromise = null;

const _create = async () => {
    // Create database.
    const db = await RxDB.create({
      name: dbName,
      adapter: 'idb',
      password: '7/v8a_-2q,5Ihpb',
    });
    // create collection.
    await db.collection({
      name: 'company',
      schema: DB_SCHEMA_CRM_COMPANY
    });
    // create collection.
    await db.collection({
      name: 'people',
      schema: DB_SCHEMA_CRM_PEOPLE
    });
    return db;
}

export const get = async () => {
    if (!dbPromise)
        dbPromise = _create();
    return dbPromise;
}
