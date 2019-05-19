import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import { task } from 'ember-concurrency';
import { storageFor } from 'ember-local-storage';

import PouchDB from 'pouchdb';

export default class SyncController extends Controller {
  @tracked syncPromise = new Promise(() => {});
  @storageFor('databases') databases;

  @service store;

  @task(function*() {
    this.databases.unshiftObject(this.destination);

    let sourceDb = this.store.adapterFor('application').db;
    let destinationDb = new PouchDB(this.destination);

    this.syncPromise = sourceDb.sync(destinationDb);

    return yield this.syncPromise;
  }) sync;
}
