import { assert } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, StoreEvents } from '../../worker.index.js';

/** @typedef {import('../../').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('../../').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */

describe('AmfStoreService', () => {
  describe('listDocumentations()', () => {
    let demoStore = /** @type AmfStoreService */ (null);
    let demoApi;

    before(async () => {
      demoApi = await AmfLoader.loadApi();
      demoStore = new AmfStoreService();
      await demoStore.init();
      await demoStore.loadGraph(demoApi);
    });

    after(() => {
      demoStore.worker.terminate();
    });

    it('reads list of types', async () => {
      const result  = await demoStore.listDocumentations();
      assert.typeOf(result, 'array', 'has the result');
      assert.lengthOf(result, 1, 'has all types definitions');
    });

    it('has the documentation definition', async () => {
      const result  = await demoStore.listDocumentations();
      const [doc] = result;
      assert.typeOf(doc.id, 'string', 'has the id');
      assert.typeOf(doc.description, 'string', 'has the description');
      assert.typeOf(doc.title, 'string', 'has the title');
    });

    it('list types with the event', async () => {
      const result = await StoreEvents.Documentation.list(document.body);
      assert.typeOf(result, 'array');
    });
  });
});
