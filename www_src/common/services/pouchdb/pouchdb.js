/* eslint no-underscore-dangle: 0, camelcase: 0 */

const privates = new WeakMap();

export default class PouchDBService {
  constructor(PouchDB) {
    'ngInject';
    privates.set(this, {PouchDB});
  }

  createDb(dbName) {
    const me = privates.get(this);
    return new me.PouchDB(dbName);
  }

  destroyDb(db) {
    return db.destroy();
  }

  addItemToDb(db, item) {
    item._id = new Date().toISOString();
    return db.put(item);
  }

  getAllFromDb(db) {
    return db.allDocs({include_docs: true, descending: true});
  }
}
