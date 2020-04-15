/* global L */
import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default class PoleModel extends Model {
  @attr('string') barcode;
  @attr('number') latitude;
  @attr('number') longitude;

  @computed('latitude', 'longitude', function () {
    if (this.latitude && this.longitude) {
      return L.latLng(this.latitude, this.longitude);
    } else {
      return null;
    }
  })
  position;

  @attr('attachments', { defaultValue: () => [] }) photos;

  @attr('string') rev;

  @attr('createDate') createdAt;
  @attr('updateDate') updatedAt;
}
