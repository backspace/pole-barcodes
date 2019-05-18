import Route from '@ember/routing/route';

export default class ScanRoute extends Route {
  model() {
    return this.store.findAll('pole');
  }
}
