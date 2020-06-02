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
  @storageFor('settings') settings;

  @service store;

  version = config.APP.version;

  get derivedDestination() {
    const base = config.destinationSyncBase.replace(
      '__AUTH__',
      // eslint-disable-next-line ember/no-get
      this.get('settings.auth')
    );
    // eslint-disable-next-line ember/no-get
    return `${base}${this.get('settings.destination')}`;
  }

  @task(function* () {
    let destination;

    // eslint-disable-next-line ember/no-get
    if (this.get('settings.admin')) {
      if (this.databases.includes(this.destination)) {
        this.databases.removeObject(this.destination);
      }

      this.databases.unshiftObject(this.destination);

      destination = this.destination;
    } else {
      destination = this.derivedDestination;
    }

    let sourceDb = this.store.adapterFor('application').db;
    let destinationDb = new PouchDB(destination);

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
