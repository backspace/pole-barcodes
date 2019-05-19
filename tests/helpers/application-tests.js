import { setupApplicationTest as qunitSetup } from 'ember-qunit';

import PouchDB from 'pouchdb';
import config from 'pole-barcodes/config/environment';

function setupApplicationTest(hooks) {
  qunitSetup(hooks);

  hooks.beforeEach(async function() {
    await new PouchDB(config.emberPouch.localDb).destroy();
  });
}

export { setupApplicationTest };
