import { module, test } from 'qunit';
import { visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from '../helpers/application-tests';

import PouchDB from 'pouchdb';
import config from 'pole-barcodes/config/environment';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Acceptance | sync', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(() => {
    window.localStorage.clear();
    resetStorages();
  });

  test('can sync with another database and remember previous sync destinations', async function (assert) {
    await new PouchDB(`destination-db`).destroy();
    await new PouchDB(config.emberPouch.localDb).destroy();

    await this.owner
      .lookup('controller:sync')
      .databases.addObject('another-sync');

    await this.owner.lookup('service:store').createRecord('pole').save();
    await this.owner.lookup('service:store').createRecord('pole').save();

    await visit('/sync');

    assert.dom('[data-database]').exists({ count: 1 });
    assert.dom('[data-database]').hasText('another-sync');

    let syncController = this.owner.lookup('controller:sync');

    await fillIn('input', 'destination-db');
    await click('button');

    await syncController.syncPromise;

    assert.dom('[data-database]').exists({ count: 2 });
    assert.dom('li:first-child [data-database]').hasText('destination-db');

    assert.dom('[data-push] [data-read]').hasText('2');
    assert.dom('[data-push] [data-written').hasText('2');
    assert.dom('[data-push] [data-write-failures]').hasText('0');

    assert.dom('[data-pull] [data-read]').hasText('0');
    assert.dom('[data-pull] [data-written').hasText('0');
    assert.dom('[data-pull] [data-write-failures]').hasText('0');

    await click('li:last-child [data-database]');
    assert.dom('input').hasValue('another-sync');

    await click('button');
    assert.dom('[data-database]').exists({ count: 2 });
    assert.dom('li:first-child [data-database]').hasText('another-sync');
  });
});
