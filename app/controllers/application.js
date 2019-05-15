/* eslint-disable no-console,no-redeclare */

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked camera;
  @tracked error;
  @tracked barcode;
}
