import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import { task } from 'ember-concurrency';
import { storageFor } from 'ember-local-storage';

import PouchDB from 'pouchdb';

import config from 'pole-barcodes/config/environment';

export default class SyncController extends Controller {
  @tracked syncPromise = new Promise(() => {});
  @storageFor('databases') databases;

  @service store;

  version = config.APP.version;

  @task(function* () {
    if (this.databases.includes(this.destination)) {
      this.databases.removeObject(this.destination);
    }

    this.databases.unshiftObject(this.destination);

    let sourceDb = this.store.adapterFor('application').db;
    let destinationDb = new PouchDB(this.destination);

    this.syncPromise = sourceDb.sync(destinationDb);

    try {
      return yield this.syncPromise;
    } catch (e) {
      e.handled = e;
      throw e;
    }
  })
  sync;
}
