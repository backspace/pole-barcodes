import DS from 'ember-data';
const { DateTransform } = DS;

export default class CreateDateTransform extends DateTransform {
  serialize(deserialized) {
    return super.serialize(deserialized || new Date());
  }
}
