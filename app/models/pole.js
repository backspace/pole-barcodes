import DS from 'ember-data';
const { Model, attr } = DS;

export default class PoleModel extends Model {
  @attr('string') barcode;

  @attr('string') rev;
}
