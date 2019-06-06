import { module, test } from 'qunit';
import { visit, click, currentURL, fillIn, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from '../helpers/application-tests';

import PouchDB from 'pouchdb';
import config from 'pole-barcodes/config/environment';

module('Acceptance | poles', function(hooks) {
  setupApplicationTest(hooks);

  test('lists poles', async function(assert) {
    await this.owner
      .lookup('service:store')
      .createRecord('pole', {
        barcode: '0044019',
        latitude: 49.89940376340175,
        longitude: -97.13256220954406,
      })
      .save();
    await this.owner
      .lookup('service:store')
      .createRecord('pole', {
        barcode: '0044020',
        latitude: 49.878075159197934,
        longitude: -97.14541203651892,
      })
      .save();

    await visit('/poles');

    assert.equal(currentURL(), '/poles');
    assert.dom('td').exists({ count: 2 });
    assert.dom('td:first-child').hasText('0044019');

    assert.dom('.leaflet-popup').doesNotExist();

    await click('tbody tr:first-child');

    assert.dom('.leaflet-popup').exists();
    assert.dom('.leaflet-popup-content').hasText('0044019');
  });

  test('creates and saves a new pole', async function(assert) {
    let getCurrentPosition = navigator.geolocation.getCurrentPosition;
    navigator.geolocation.getCurrentPosition = callback => {
      callback({ coords: { latitude: 1, longitude: -1 } });
    };

    await new PouchDB(config.emberPouch.localDb).destroy();

    await visit('/poles');
    await click('a.new');

    await fillIn('[data-barcode]', '1234');

    await click('[data-locate]');

    assert.dom('[data-latitude]').hasValue('1');
    assert.dom('[data-longitude]').hasValue('-1');

    await click('[data-save]');
    await waitFor('a.new');

    assert.dom('td').exists({ count: 1 });
    assert.dom('td:first-child').hasText('1234');
    assert.equal(currentURL(), '/poles');

    navigator.geolocation.getCurrentPosition = getCurrentPosition;

    await click('a.new');

    assert.dom('[data-barcode]').hasValue('');
  });
});
