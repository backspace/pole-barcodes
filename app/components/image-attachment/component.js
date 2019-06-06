import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

import { task } from 'ember-concurrency';
import blobUtil from 'blob-util';

export default class ImageAttachment extends Component {
  @service store;

  constructor() {
    super(...arguments);
  }

  @task(function*() {
    let model = this.args.model;

    let adapter = this.store.adapterFor(model.constructor.modelName);

    let attachment = this.args.attachment;
    let data = yield adapter.db.rel.getAttachment(
      adapter.getRecordTypeName(model.constructor),
      model.id,
      attachment.name
    );

    return yield blobUtil.blobToBase64String(data);
  })
  base64StringTask;
}
