import DS from 'ember-data';
const { DateTransform } = DS;

export default class UpdateDateTransform extends DateTransform {
  serialize() {
    return super.serialize(new Date());
  }
}
