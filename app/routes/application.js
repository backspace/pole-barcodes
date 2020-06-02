import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';

export default class ApplicationRoute extends Route {
  @storageFor('settings') settings;

  model({ admin, auth, destination }) {
    if (admin) {
      this.settings.set('admin', admin === 'true');
    }

    if (auth) {
      this.settings.set('auth', auth);
    }

    if (destination) {
      this.settings.set('destination', destination);
    }
  }
}
