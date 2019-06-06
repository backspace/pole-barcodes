import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default class PoleForm extends Component {
  @service store;
  @service router;

  @tracked barcode;
  @tracked latitude;
  @tracked longitude;

  @action
  locate() {
    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }

  @action
  save() {
    let photos = [];
    if (this.barcodePhoto) {
      let base64Only = this.barcodePhoto.substring(
        this.barcodePhoto.indexOf(',') + 1
      );
      photos.push(
        EmberObject.create({
          name: 'barcode.png',
          content_type: 'image/png',
          data: base64Only,
        })
      );
    }
    this.store
      .createRecord('pole', {
        barcode: this.barcode,
        latitude: this.latitude,
        longitude: this.longitude,
        photos,
      })
      .save()
      .then(() => this.router.transitionTo('poles'));
  }
}
