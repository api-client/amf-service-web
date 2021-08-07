import { assert, oneEvent } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, StoreEvents, StoreEventTypes, ns } from '../../worker.index.js';

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

  describe('Listing', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi, 'RAML 1.0');
    });

    describe('listEndpoints()', () => {
      let endpoints = /** @type ApiEndPointListItem[] */ (null);
  
      before(async () => {
        endpoints = await store.listEndpoints();
      });
  
      it('returns an array of endpoints', async () => {
        assert.typeOf(endpoints, 'array');
      });
  
      it('has the id', async () => {
        const [endpoint] = endpoints;
        assert.typeOf(endpoint.id, 'string');
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
        endpoints = await store.listEndpointsWithOperations();
      });
  
      it('returns an array of endpoints', async () => {
        assert.typeOf(endpoints, 'array');
      });
  
      it('has the id', async () => {
        const [endpoint] = endpoints;
        assert.typeOf(endpoint.id, 'string');
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

    it('dispatches the create event', async () => {
      store.addEndpoint({ path: '/test-5', summary: 'test summary', });
      const e = await oneEvent(demoEt, StoreEventTypes.Endpoint.State.created);
      const { detail } = e;
      assert.typeOf(detail.graphId, 'string', 'has the graphId');
      assert.equal(detail.domainType, ns.aml.vocabularies.apiContract.EndPoint, 'has the domainType');
      assert.typeOf(detail.item, 'object', 'has the item');
    });

    it('creates an endpoint from the event', async () => {
      const result = await StoreEvents.Endpoint.add(demoEt, { path: '/test-6' });
      const stored = await store.getEndpoint(result.id);
      assert.deepEqual(stored, result);
    });
  });

  describe('deleteEndpoint()', () => {
    let id = /** @type string */ (null);

    beforeEach(async () => {
      await store.createWebApi();
      id = (await store.addEndpoint({ path: '/test' })).id;
    });

    it('removes the endpoint from the API', async () => {
      await store.deleteEndpoint(id);
      const endpointsAfter = await store.listEndpoints();
      assert.lengthOf(endpointsAfter, 0);
    });

    it('removes the endpoint from the store with the event', async () => {
      await StoreEvents.Endpoint.delete(demoEt, id);
      const endpointsAfter = await store.listEndpoints();
      assert.lengthOf(endpointsAfter, 0);
    });

    it('dispatches the delete event', async () => {
      StoreEvents.Endpoint.delete(demoEt, id);
      const e = await oneEvent(demoEt, StoreEventTypes.Endpoint.State.deleted);
      const { detail } = e;
      assert.equal(detail.graphId, id, 'has the graphId');
      assert.equal(detail.domainType, ns.aml.vocabularies.apiContract.EndPoint, 'has the graphType');
    });
  });

  describe('getEndpoint()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi, 'RAML 1.0');
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

    it('has custom domain properties', async () => {
      const result = await store.getEndpoint('/people');
      const { customDomainProperties } = result;
      assert.typeOf(customDomainProperties, 'array', 'has customDomainProperties');
      assert.lengthOf(customDomainProperties, 1, 'has single customDomainProperty');
      const [cdp] = customDomainProperties;
      assert.equal(cdp.name, 'clearanceLevel', 'cdp.name is set');
      assert.typeOf(cdp.definedBy, 'object', 'cdp.definedBy is set');
      const { extension } = cdp;
      assert.typeOf(extension, 'object', 'cdp.extension is set');
      assert.include(extension.types, ns.aml.vocabularies.data.Object, 'extension has types');
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

    it('reads endpoint from the event', async () => {
      const result = await StoreEvents.Endpoint.get(demoEt, '/people/{personId}');
      assert.typeOf(result, 'object');
      assert.equal(result.path, '/people/{personId}');
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

    it('updates the endpoint via the event', async () => {
      await StoreEvents.Endpoint.update(demoEt, id, 'path', '/updated-path')
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

  describe('addOperation()', () => {
    let id = /** @type string */ (null);
    const path = '/test';

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path });
      id = ep.id;
    });

    it('adds the operation', async () => {
      const created = await store.addOperation(id, { method: 'get' });
      assert.typeOf(created, 'object', 'returns created operation');
      const operation = await store.getOperation(created.id);
      assert.deepEqual(operation, created, 'has the operation in the graph');
    });

    it('adds the name', async () => {
      const operation = await store.addOperation(id, { method: 'get', name: 'test-name' });
      assert.equal(operation.name, 'test-name');
    });

    it('adds the description', async () => {
      const operation = await store.addOperation(id, { method: 'get', description: 'test-description' });
      assert.equal(operation.description, 'test-description');
    });

    it('adds the summary', async () => {
      const operation = await store.addOperation(id, { method: 'get', summary: 'test-summary' });
      assert.equal(operation.summary, 'test-summary');
    });

    it('adds the deprecated', async () => {
      const operation = await store.addOperation(id, { method: 'get', deprecated: true });
      assert.isTrue(operation.deprecated);
    });

    it('adds the schemes[]', async () => {
      const operation = await store.addOperation(id, { method: 'get', schemes: ['HTTP'] });
      assert.deepEqual(operation.schemes, ['HTTP']);
    });

    it('adds the accepts[]', async () => {
      const operation = await store.addOperation(id, { method: 'get', accepts: ['application/xml'] });
      assert.deepEqual(operation.accepts, ['application/xml']);
    });

    it('adds the contentType[]', async () => {
      const operation = await store.addOperation(id, { method: 'get', contentType: ['application/xml'] });
      assert.deepEqual(operation.contentType, ['application/xml']);
    });

    it('dispatches the create event', async () => {
      store.addOperation(id, { method: 'get' });
      const e = await oneEvent(demoEt, StoreEventTypes.Operation.State.created);
      const { detail } = e;
      assert.typeOf(detail.graphId, 'string', 'has the graphId');
      assert.equal(detail.domainType, ns.aml.vocabularies.apiContract.Operation, 'has the domainType');
      assert.typeOf(detail.item, 'object', 'has the item');
    });

    it('creates an operation from the event', async () => {
      const result = await StoreEvents.Endpoint.addOperation(demoEt, id, { method: 'get' });
      const stored = await store.getOperation(result.id);
      assert.deepEqual(stored, result);
    });
  });

  describe('listOperations()', () => {
    let id = /** @type string */ (null);
    const path = '/test';

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path });
      id = ep.id;
      await store.addOperation(id, { method: 'get' });
      await store.addOperation(id, { method: 'post' });
    });

    it('adds the operation', async () => {
      const operations = await store.listOperations(id);
      assert.typeOf(operations, 'array', 'returns endpoint operations');
      assert.lengthOf(operations, 2, 'has all operations');
      assert.equal(operations[0].method, 'get', 'has the operation');
    });

    it('lists operations via the event', async () => {
      const operations = await StoreEvents.Endpoint.listOperations(demoEt, id);
      assert.typeOf(operations, 'array', 'returns endpoint operations');
      assert.lengthOf(operations, 2, 'has all operations');
      assert.equal(operations[0].method, 'get', 'has the operation');
    });
  });

  describe('deleteOperation()', () => {
    let id = /** @type string */ (null);
    let epId = /** @type string */ (null);
    const path = '/test';

    beforeEach(async () => {
      await store.createWebApi();
      epId = (await store.addEndpoint({ path })).id;
      const op = await store.addOperation(epId, { 
        method: 'get',
      });
      id = op.id;
    });

    it('removes the object from the store', async () => {
      await store.deleteOperation(id, epId);
      let thrown = false;
      try {
        await store.getOperation(id);
      } catch (e) {
        thrown = true;
      }
      assert.isTrue(thrown);
    });

    it('removes the object from the store with the event', async () => {
      await StoreEvents.Endpoint.removeOperation(demoEt, id, epId);
      let thrown = false;
      try {
        await store.getOperation(id);
      } catch (e) {
        thrown = true;
      }
      assert.isTrue(thrown);
    });

    it('dispatches the delete event', async () => {
      store.deleteOperation(id, epId);
      const e = await oneEvent(demoEt, StoreEventTypes.Operation.State.deleted);
      const { detail } = e;
      assert.equal(detail.graphId, id, 'has the graphId');
      assert.equal(detail.domainType, ns.aml.vocabularies.apiContract.Operation, 'has the graphType');
    });
  });
});
