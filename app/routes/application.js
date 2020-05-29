import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';

export default class ApplicationRoute extends Route {
  @storageFor('settings') settings;

  model({ admin }) {
    if (admin) {
      this.settings.set('admin', admin === 'true');
    }
  }
}
