import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NewPoleController extends Controller {
  @service store;
  @tracked barcode;

  @action
  save() {
    this.store.createRecord('pole', {
      barcode: this.barcode
    }).save().then(() => this.transitionToRoute('poles'));
  }
}
