import { Adapter } from 'ember-pouch';
import PouchDB from 'pouchdb';
import config from 'pole-barcodes/config/environment';

import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';

function createDb() {
  let localDb = config.emberPouch.localDb;

  assert('emberPouch.localDb must be set', !isEmpty(localDb));

  let db = new PouchDB(localDb);
  return db;
}

export default Adapter.extend({
  init() {
    this._super(...arguments);
    this.set('db', createDb());
  },
});
