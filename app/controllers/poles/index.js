import Controller from '@ember/controller';
import { filter, mapBy } from '@ember/object/computed';

export default class PolesIndexController extends Controller {
  @mapBy('model', 'position') allPositions;
  @filter('allPositions', (position) => position) positions;
}
