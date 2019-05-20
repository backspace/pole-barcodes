import DS from 'ember-data';
const { Model, attr } = DS;

export default class PoleModel extends Model {
  @attr('string') barcode;
  @attr('number') latitude;
  @attr('number') longitude;

  @attr('attachments', { defaultValue: () => [] } ) photos;

  @attr('string') rev;

  @attr('createDate') createdAt;
  @attr('updateDate') updatedAt;
}
