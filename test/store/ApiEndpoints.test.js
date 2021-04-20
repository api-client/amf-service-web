import { assert } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, StoreEvents } from '../../worker.index.js';

/** @typedef {import('../../').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('../../').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */

describe('AmfStoreService', () => {
  let store = /** @type AmfStoreService */ (null);
  const demoEt = document.createElement('span');

  before(async () => {
    store = new AmfStoreService(demoEt);
    await store.init();
  });

  after(() => {
    store.worker.terminate();
  });

  describe('listEndpoints()', () => {
    let endpoints = /** @type ApiEndPointListItem[] */ (null);

    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi);
      endpoints = await store.listEndpoints();
    });

    it('returns an array of endpoints', async () => {
      assert.typeOf(endpoints, 'array');
    });

    it('has the id', async () => {
      const [endpoint] = endpoints;
      assert.typeOf(endpoint.id, 'string');
      assert.include(endpoint.id, 'amf://');
    });

    it('has the path', async () => {
      const [endpoint] = endpoints;
      // whatever is first in the API spec
      assert.equal(endpoint.path, '/test-parameters/{feature}');
    });

    it('has the name', async () => {
      // whichever has the name
      const endpoint = endpoints[2];
      assert.equal(endpoint.name, 'People');
    });

    it('list endpoints with the event', async () => {
      const result = await StoreEvents.Endpoint.list(demoEt);
      assert.typeOf(result, 'array');
    });
  });

  describe('listEndpointsWithOperations()', () => {
    let endpoints = /** @type ApiEndPointWithOperationsListItem[] */ (null);
    
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi);
      endpoints = await store.listEndpointsWithOperations();
    });

    it('returns an array of endpoints', async () => {
      assert.typeOf(endpoints, 'array');
    });

    it('has the id', async () => {
      const [endpoint] = endpoints;
      assert.typeOf(endpoint.id, 'string');
      assert.include(endpoint.id, 'amf://');
    });

    it('has the path', async () => {
      const [endpoint] = endpoints;
      // whatever is first in the API spec
      assert.equal(endpoint.path, '/test-parameters/{feature}');
    });

    it('has the name', async () => {
      // whichever has the name
      const endpoint = endpoints[2];
      assert.equal(endpoint.name, 'People');
    });

    it('has the operations', async () => {
      const endpoint = endpoints[2];
      // this endpoint has 3 operations. When the spec change update this test.
      const { operations } = endpoint;
      assert.typeOf(operations, 'array', 'has operations');
      assert.lengthOf(operations, 3, 'has all operations');
      const [op] = operations;
      assert.equal(op.method, 'get', 'operation has method');
      assert.equal(op.name, 'List people', 'Operation has the name');
      assert.typeOf(op.id, 'string', 'Operation has the id');
    });

    it('list endpoints and operations with the event', async () => {
      const result = await StoreEvents.Endpoint.listWithOperations(demoEt);
      assert.typeOf(result, 'array');
    });
  });

  describe('addEndpoint()', () => {
    beforeEach(async () => {
      await store.createWebApi();
    });

    it('adds a new endpoint and returns its id', async () => {
      const endpoint = await store.addEndpoint({ path: '/test-1' });
      assert.typeOf(endpoint, 'object', 'returns the created endpoint');
      const endpoints = await store.listEndpoints();
      assert.deepEqual(endpoints[0].id, endpoint.id, 'created an endpoint');
    });

    it('adds the name', async () => {
      const endpoint = await store.addEndpoint({ path: '/test-2', name: 'test endpoint' });
      assert.equal(endpoint.name, 'test endpoint');
    });

    it('adds the description', async () => {
      const endpoint = await store.addEndpoint({ path: '/test-3', description: 'test desc', });
      assert.equal(endpoint.description, 'test desc');
    });

    it('adds the summary', async () => {
      const endpoint = await store.addEndpoint({ path: '/test-4', summary: 'test summary', });
      assert.equal(endpoint.summary, 'test summary');
    });
  });

  describe('deleteEndpoint()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi);
    });

    it('removes an endpoint from the API', async () => {
      const endpointsBefore = await store.listEndpoints();
      await store.deleteEndpoint(endpointsBefore[0].id);
      const endpointsAfter = await store.listEndpoints();
      assert.equal(endpointsAfter.length, endpointsBefore.length - 1);
    });
  });

  describe('getEndpoint()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi);
    });

    it('reads endpoint by path', async () => {
      const result = await store.getEndpoint('/people/{personId}');
      assert.typeOf(result, 'object');
      assert.equal(result.path, '/people/{personId}');
    });

    it('reads endpoint by id', async () => {
      const endpoints = await store.listEndpoints();
      const result = await store.getEndpoint(endpoints[0].id);
      assert.typeOf(result, 'object');
      assert.equal(result.id, endpoints[0].id);
    });

    it('has endpoint properties', async () => {
      const result = await store.getEndpoint('/people/{personId}');
      assert.typeOf(result.id, 'string', 'has the id');
      assert.equal(result.path, '/people/{personId}', 'has the path');
      assert.equal(result.relativePath, '/people/{personId}', 'has the relativePath');
      assert.equal(result.description, 'The endpoint to access information about the person', 'has the description');
      assert.equal(result.name, 'A person', 'has the name');
      assert.lengthOf(result.parameters, 1, 'has the parameters');
      assert.lengthOf(result.operations, 3, 'has the operations');
    });
  });

  describe('updateEndpointProperty()', () => {
    let id = /** @type string */ (null);

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({path: '/test'});
      id = ep.id;
    });

    it('updates the name', async () => {
      await store.updateEndpointProperty(id, 'name', 'a name');
      const endpoint = await store.getEndpoint(id);
      assert.equal(endpoint.name, 'a name');
    });

    it('updates the description', async () => {
      await store.updateEndpointProperty(id, 'description', 'a description');
      const endpoint = await store.getEndpoint(id);
      assert.equal(endpoint.description, 'a description');
    });

    it('updates the summary', async () => {
      await store.updateEndpointProperty(id, 'summary', 'a summary');
      const endpoint = await store.getEndpoint(id);
      assert.equal(endpoint.summary, 'a summary');
    });

    it('updates the path', async () => {
      await store.updateEndpointProperty(id, 'path', '/updated-path');
      const endpoint = await store.getEndpoint(id);
      assert.equal(endpoint.path, '/updated-path');
    });

    it('throws for unknown properties', async () => {
      let thrown = false;
      try {
        await store.updateEndpointProperty(id, 'other', 'value');
      } catch (e) {
        thrown = true;
      }
      assert.isTrue(thrown);
    });
  });
});
