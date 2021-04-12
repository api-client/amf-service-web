import { assert } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, StoreEvents } from '../../worker.index.js';

/** @typedef {import('../../').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('../../').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */

describe('AmfStoreService', () => {
  describe('listSecurity()', () => {
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

    it('reads list of security', async () => {
      const result  = await demoStore.listSecurity();
      assert.typeOf(result, 'array', 'has the security');
      assert.lengthOf(result, 3, 'has all security definitions');
    });

    it('has the security definition', async () => {
      const result  = await demoStore.listSecurity();
      const [sec] = result;
      assert.typeOf(sec.id, 'string', 'has the id');
      assert.equal(sec.type, 'OAuth 2.0', 'has the type');
      assert.equal(sec.name, 'oauth_2_0', 'has the name');
    });

    it('list security with the event', async () => {
      const result = await StoreEvents.Security.list(document.body);
      assert.typeOf(result, 'array');
    });
  });
});
