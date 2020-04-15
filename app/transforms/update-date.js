// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import DS from 'ember-data';
const { DateTransform } = DS;

export default class UpdateDateTransform extends DateTransform {
  serialize() {
    return super.serialize(new Date());
  }
}
