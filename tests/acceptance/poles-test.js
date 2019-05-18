import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | poles', function(hooks) {
  setupApplicationTest(hooks);

  test('lists poles', async function(assert) {
    await this.owner.lookup('service:store').createRecord('pole', {barcode: '0044019'}).save();
    await this.owner.lookup('service:store').createRecord('pole', {barcode: '0044020'}).save();

    await visit('/poles');

    assert.equal(currentURL(), '/poles');
    assert.dom('td').exists({count: 2});
    assert.dom('td:first-child').hasText('0044019');
  });
});
