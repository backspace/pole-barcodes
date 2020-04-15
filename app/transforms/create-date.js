// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import DS from 'ember-data';
const { DateTransform } = DS;

export default class CreateDateTransform extends DateTransform {
  serialize(deserialized) {
    return super.serialize(deserialized || new Date());
  }
}
