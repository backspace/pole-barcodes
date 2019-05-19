import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NewPoleController extends Controller {
  @service store;
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
    this.store.createRecord('pole', {
      barcode: this.barcode
    }).save().then(() => this.transitionToRoute('poles'));
  }
}
