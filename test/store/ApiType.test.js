import { assert } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, StoreEvents } from '../../worker.index.js';

/** @typedef {import('../../').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('../../').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */

describe('AmfStoreService', () => {
  describe('listTypes()', () => {
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
      const result  = await demoStore.listTypes();
      assert.typeOf(result, 'array', 'has the result');
      assert.lengthOf(result, 6, 'has all types definitions');
    });

    it('has the types definition', async () => {
      const result  = await demoStore.listTypes();
      const [type] = result;
      assert.typeOf(type.id, 'string', 'has the id');
      assert.equal(type.name, 'ErrorResource', 'has the name');
    });

    it('list types with the event', async () => {
      const result = await StoreEvents.Type.list(document.body);
      assert.typeOf(result, 'array');
    });
  });
});
