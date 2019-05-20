import Controller from '@ember/controller';
import { filter, mapBy } from '@ember/object/computed';

export default class PolesController extends Controller {
  @mapBy('model', 'position') allPositions;
  @filter('allPositions', position => position) positions;
}
