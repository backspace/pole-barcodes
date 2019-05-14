import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked camera;
  @tracked error;

  @action
  getUserMedia() {
    let constraints = {
      video: { facingMode: 'environment' }
    };

    navigator.mediaDevices.getUserMedia(constraints).then(device => {
      this.camera = device;
    }).catch(e => {
      this.error = e;
    })
  }
}
