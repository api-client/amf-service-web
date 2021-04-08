import { assert } from '@open-wc/testing';
import { AmfLoader } from './AmfLoader.js';
import { AmfStoreService } from '../worker.index.js';
import { workerValue, sendMessage } from '../src/AmfStoreProxy.js';
import { optionsValue } from '../src/AmfStoreService.js';

/** @typedef {import('..').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('..').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */

describe('AmfStoreService', () => {
  describe('#worker', () => {
    let store = /** @type AmfStoreService */ (null);

    before(() => {
      store = new AmfStoreService();
    });

    after(() => {
      store.worker.terminate();
    });

    it('creates the web worker', () => {
      assert.ok(store.worker, 'has the worker property');
    });

    it('sets the [workerValue]', () => {
      assert.ok(store[workerValue], 'has the worker property');
    });

    it('creates the worker only once', () => {
      const w1 = store.worker;
      const w2 = store.worker;
      assert.isTrue(w1 === w2);
    });
  });

  describe('#options', () => {
    let store = /** @type AmfStoreService */ (null);

    it('has the set options', () => {
      const opts = {
        amfLocation: 'test',
      };
      store = new AmfStoreService(window, opts);
      assert.isTrue(store.options === opts);
    });

    it('sets the [optionsValue] property', () => {
      const opts = {
        amfLocation: 'test',
      };
      store = new AmfStoreService(window, opts);
      assert.isTrue(store[optionsValue] === opts);
    });
  });

  describe('#eventsTarget', () => {
    let store = /** @type AmfStoreService */ (null);

    it('sets the default events target', () => {
      store = new AmfStoreService();
      assert.isTrue(store.eventsTarget === window);
    });

    it('sets the passed events target', () => {
      store = new AmfStoreService(document.body);
      assert.isTrue(store.eventsTarget === document.body);
    });
  });

  describe('worker initialization', () => {
    let store = /** @type AmfStoreService */ (null);
    afterEach(() => {
      // @ts-ignore
      window.AmfService = undefined;
      store.worker.terminate();
    });

    it('uses the createWebWorker() init option', async () => {
      let called = false;
      store = new AmfStoreService(window, {
        createWebWorker: () => {
          called = true;
          return new Worker('./test/MockWorker.js');
        }
      });
      await store.init();
      assert.isTrue(called);
    });

    it('uses the #workerLocation init option', async () => {
      store = new AmfStoreService(window, { workerLocation: './test/MockWorker.js' });
      const result = await store[sendMessage]('test-command', 'a', 'b', 'c');
      assert.equal(result.type, 'test-command');
      assert.deepEqual(result.arguments, [ 'a', 'b', 'c' ]);
    });

    it('uses the window.AmfService configuration', async () => {
      // @ts-ignore
      window.AmfService = {
        workers: {
          workerStore: './test/MockWorker.js',
        },
      };
      store = new AmfStoreService();
      const result = await store[sendMessage]('test-command', 'a', 'b', 'c');
      assert.equal(result.type, 'test-command');
      assert.deepEqual(result.arguments, [ 'a', 'b', 'c' ]);
    });
  });

  describe('init()', () => {
    let store = /** @type AmfStoreService */ (null);

    before(() => {
      store = new AmfStoreService();
    });

    after(() => {
      store.worker.terminate();
    });

    it('initializes the store', async () => {
      await store.init();
    });
  });

  describe('loadGraph()', () => {
    let store = /** @type AmfStoreService */ (null);

    before(async () => {
      store = new AmfStoreService();
      await store.init();
    });

    after(() => {
      store.worker.terminate();
    });

    it('initializes the store with RAML API', async () => {
      const model = await AmfLoader.loadApi('demo-api.json');
      await store.loadGraph(model);
    });

    it('initializes the store with OAS 3 API', async () => {
      const model = await AmfLoader.loadApi('oas-3-api.json');
      await store.loadGraph(model);
    });

    it('initializes the store with Async API', async () => {
      const model = await AmfLoader.loadApi('streetlights.json');
      await store.loadGraph(model);
    });
  });

  describe('createWebApi()', () => {
    let store = /** @type AmfStoreService */ (null);

    before(async () => {
      store = new AmfStoreService();
      await store.init();
    });

    after(() => {
      store.worker.terminate();
    });

    it('initializes empty web API', async () => {
      await store.createWebApi();
      const api = await store.getApi();
      assert.typeOf(api.id, 'string', 'has the id');
      assert.deepEqual(api.schemes, [], 'has empty schemes');
      assert.deepEqual(api.accepts, [], 'has empty accepts');
      assert.deepEqual(api.contentType, [], 'has empty contentType');
      assert.deepEqual(api.endPoints, [], 'has empty endPoints');
      assert.deepEqual(api.documentations, [], 'has empty documentations');
      assert.deepEqual(api.servers, [], 'has empty servers');
      assert.deepEqual(api.security, [], 'has empty security');
    });

    it('returns the id of the created node', async () => {
      const id = await store.createWebApi();
      assert.typeOf(id, 'string', 'returns the id');
      const api = await store.getApi();
      assert.equal(api.id, id, 'it is the WebApi id');
    });

    it('sets the name', async () => {
      await store.createWebApi({
        name: 'test-api'
      });
      const api = await store.getApi();
      assert.equal(api.name, 'test-api');
    });

    it('sets the description', async () => {
      await store.createWebApi({
        description: 'test-description'
      });
      const api = await store.getApi();
      assert.equal(api.description, 'test-description');
    });

    it('sets the version', async () => {
      await store.createWebApi({
        version: 'test-version'
      });
      const api = await store.getApi();
      assert.equal(api.version, 'test-version');
    });

    it('sets the termsOfService', async () => {
      await store.createWebApi({
        termsOfService: 'test-termsOfService'
      });
      const api = await store.getApi();
      assert.equal(api.termsOfService, 'test-termsOfService');
    });

    it('sets the schemes', async () => {
      await store.createWebApi({
        schemes: ['https', 'http']
      });
      const api = await store.getApi();
      assert.deepEqual(api.schemes, ['https', 'http']);
    });

    it('sets the accepts', async () => {
      await store.createWebApi({
        accepts: ['application/amf-test']
      });
      const api = await store.getApi();
      assert.deepEqual(api.accepts, ['application/amf-test']);
    });

    it('sets the contentType', async () => {
      await store.createWebApi({
        contentType: ['application/amf-test']
      });
      const api = await store.getApi();
      assert.deepEqual(api.contentType, ['application/amf-test']);
    });
  });

  describe('getApi()', () => {
    let demoStore = /** @type AmfStoreService */ (null);
    let oasStore = /** @type AmfStoreService */ (null);
    let demoApi;
    let oasApi;

    before(async () => {
      demoApi = await AmfLoader.loadApi();
      demoStore = new AmfStoreService();
      await demoStore.init();
      await demoStore.loadGraph(demoApi);

      oasApi = await AmfLoader.loadApi('oas-3-api.json');
      oasStore = new AmfStoreService();
      await oasStore.init();
      await oasStore.loadGraph(oasApi);
    });

    after(() => {
      demoStore.worker.terminate();
      oasStore.worker.terminate();
    });

    it('has endPoints property', async () => {
      const api = await demoStore.getApi();
      assert.typeOf(api.endPoints, 'array', 'has the endpoints');
      // I am lazy....
      assert.isAbove(api.endPoints.length, 5, 'has more than 5 endpoints');
      assert.typeOf(api.endPoints[0], 'string', 'has the endPoint id');
    });

    it('has servers property', async () => {
      const api = await demoStore.getApi();
      assert.typeOf(api.servers, 'array', 'has the servers');
      // RAML has only one server
      assert.lengthOf(api.servers, 1, 'has the single server');
      assert.typeOf(api.servers[0], 'string', 'has the server id');
    });

    it('has the name property', async () => {
      const api = await demoStore.getApi();
      assert.equal(api.name, 'API body demo');
    });

    it('has the version property', async () => {
      const api = await demoStore.getApi();
      assert.equal(api.version, 'v1');
    });

    it('has the description property', async () => {
      const api = await demoStore.getApi();
      assert.typeOf(api.description, 'string');
    });

    it('has the id property', async () => {
      const api = await demoStore.getApi();
      assert.typeOf(api.id, 'string');
    });

    it('has the schemes property', async () => {
      const api = await demoStore.getApi();
      assert.deepEqual(api.schemes, ['HTTP', 'HTTPS']);
    });

    it('has the accepts property', async () => {
      const api = await demoStore.getApi();
      assert.deepEqual(api.accepts, ['application/json', 'application/xml']);
    });

    it('has the contentType property', async () => {
      const api = await demoStore.getApi();
      assert.deepEqual(api.contentType, ['application/json', 'application/xml']);
    });

    it('has the documentations property', async () => {
      const api = await demoStore.getApi();
      assert.typeOf(api.documentations, 'array', 'has the documentations');
      // RAML has only one server
      assert.lengthOf(api.documentations, 1, 'has the single documentation');
      assert.typeOf(api.documentations[0], 'string', 'has the documentation id');
    });

    it('has multiple servers for OAS', async () => {
      const api = await oasStore.getApi();
      assert.typeOf(api.servers, 'array', 'has the servers');
      assert.lengthOf(api.servers, 4, 'has all the servers');
      assert.typeOf(api.servers[0], 'string', 'has the server id');
    });

    it('has the termsOfService property', async () => {
      const api = await oasStore.getApi();
      assert.equal(api.termsOfService, 'http://example.com/terms/');
    });

    it('has the provider property', async () => {
      const api = await oasStore.getApi();
      assert.typeOf(api.provider, 'string', 'has the property');
      assert.include(api.provider, 'amf://id', 'has the value');
    });

    it('has the license property', async () => {
      const api = await oasStore.getApi();
      assert.typeOf(api.license, 'string', 'has the property');
      assert.include(api.license, 'amf://id', 'has the value');
    });
  });

  describe('listServers()', () => {
    let demoStore = /** @type AmfStoreService */ (null);
    let oasStore = /** @type AmfStoreService */ (null);
    let demoApi;
    let oasApi;

    before(async () => {
      demoApi = await AmfLoader.loadApi();
      demoStore = new AmfStoreService();
      await demoStore.init();
      await demoStore.loadGraph(demoApi);

      oasApi = await AmfLoader.loadApi('oas-3-api.json');
      oasStore = new AmfStoreService();
      await oasStore.init();
      await oasStore.loadGraph(oasApi);
    });

    after(() => {
      demoStore.worker.terminate();
      oasStore.worker.terminate();
    });

    it('returns a single server for RAML', async () => {
      const result = await demoStore.listServers();
      assert.typeOf(result, 'array', 'returns an array');
      assert.lengthOf(result, 1, 'has a single server');
    });

    it('has server properties (RAML)', async () => {
      const result = await demoStore.listServers();
      const [src] = result;
      assert.typeOf(src.id, 'string', 'has the id');
      assert.equal(src.url, 'http://{instance}.domain.com/{version}/', 'has the url');
      assert.typeOf(src.variables, 'array', 'has the variables');
      assert.lengthOf(src.variables, 2, 'has listed variables');
      assert.include(src.variables[0], 'amf://', 'a variable is a link');
    });

    it('returns servers for OAS', async () => {
      const result = await oasStore.listServers();
      assert.typeOf(result, 'array', 'returns an array');
      assert.lengthOf(result, 4, 'has 4 servers');
    });

    it('has server properties (OAS)', async () => {
      const result = await oasStore.listServers();
      const src = result[3];
      assert.typeOf(src.id, 'string', 'has the id');
      assert.equal(src.url, 'https://{username}.gigantic-server.com:{port}/{basePath}', 'has the url');
      assert.typeOf(src.variables, 'array', 'has the variables');
      assert.lengthOf(src.variables, 3, 'has listed variables');
      assert.include(src.variables[0], 'amf://', 'a variable is a link');
      assert.equal(src.description, 'The production API server', 'has the description');
    });
  });

  describe('addServer()', () => {
    let store = /** @type AmfStoreService */ (null);

    before(async () => {
      store = new AmfStoreService();
      await store.init();
    });

    after(() => {
      store.worker.terminate();
    });

    beforeEach(async () => {
      await store.createWebApi();
    });

    it('adds a server to the API', async () => {
      const id = await store.addServer({ url: 'https://test.com' });
      assert.typeOf(id, 'string', 'returns created id');
      const [server] = await store.listServers();
      assert.typeOf(server, 'object', 'has the server');
      assert.equal(server.url, 'https://test.com', 'has the passed url');
      assert.deepEqual(server.variables, [], 'has no variables');
    });

    it('sets a description', async () => {
      await store.addServer({ url: 'https://test.com', description: 'test-desc' });
      const [server] = await store.listServers();
      assert.equal(server.description, 'test-desc');
    });

    it('adds new variables to the server', async () => {
      await store.addServer({ url: 'https://test.com/{path}/{other}', variables: ['path', 'other'] });
      const [server] = await store.listServers();
      assert.lengthOf(server.variables, 2, 'has created variables');
    });
  });

  describe('getServer()', () => {
    let oasStore = /** @type AmfStoreService */ (null);
    let oasApi;
    let ids = /** @type string[] */ (null);

    before(async () => {
      oasApi = await AmfLoader.loadApi('oas-3-api.json');
      oasStore = new AmfStoreService();
      await oasStore.init();
      await oasStore.loadGraph(oasApi);
      const servers = await oasStore.listServers();
      ids = servers.map((s) => s.id);
    });

    after(() => {
      oasStore.worker.terminate();
    });

    it('returns the server', async () => {
      const srv = await oasStore.getServer(ids[3]);
      assert.typeOf(srv, 'object');
    });

    it('the server has the id', async () => {
      const srv = await oasStore.getServer(ids[3]);
      assert.typeOf(srv.id, 'string');
    });

    it('the server has the url', async () => {
      const srv = await oasStore.getServer(ids[3]);
      assert.equal(srv.url, 'https://{username}.gigantic-server.com:{port}/{basePath}');
    });

    it('the server has the description', async () => {
      const srv = await oasStore.getServer(ids[3]);
      assert.equal(srv.description, 'The production API server');
    });

    it('the server has the variables', async () => {
      const srv = await oasStore.getServer(ids[3]);
      assert.typeOf(srv.variables, 'array', 'is the array');
      assert.lengthOf(srv.variables, 3, 'has all variables');
    });
  });

  describe('listEndpoints()', () => {
    let demoStore = /** @type AmfStoreService */ (null);
    let demoApi;
    let endpoints = /** @type ApiEndPointListItem[] */ (null);

    before(async () => {
      demoApi = await AmfLoader.loadApi();
      demoStore = new AmfStoreService();
      await demoStore.init();
      await demoStore.loadGraph(demoApi);
      endpoints = await demoStore.listEndpoints();
    });

    after(() => {
      demoStore.worker.terminate();
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
  });

  describe('listEndpointsWithOperations()', () => {
    let demoStore = /** @type AmfStoreService */ (null);
    let demoApi;
    let endpoints = /** @type ApiEndPointWithOperationsListItem[] */ (null);

    before(async () => {
      demoApi = await AmfLoader.loadApi();
      demoStore = new AmfStoreService();
      await demoStore.init();
      await demoStore.loadGraph(demoApi);
      endpoints = await demoStore.listEndpointsWithOperations();
    });

    after(() => {
      demoStore.worker.terminate();
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
  });

  describe('createWebApi()', () => {
    let store = /** @type AmfStoreService */ (null);

    before(async () => {
      store = new AmfStoreService();
      await store.init();
    });

    after(() => {
      store.worker.terminate();
    });

    beforeEach(async () => {
      await store.createWebApi();
    });

    it('adds a new endpoint and returns its id', async () => {
      const id = await store.addEndpoint({ path: '/test-1' });
      assert.typeOf(id, 'string', 'returns the id of the created endpoint');
      const endpoints = await store.listEndpoints();
      assert.equal(endpoints[0].id, id, 'created an endpoint');
    });

    it('adds the name', async () => {
      await store.addEndpoint({ path: '/test-2', name: 'test endpoint' });
      const endpoints = await store.listEndpoints();
      assert.equal(endpoints[0].name, 'test endpoint');
    });

    it('adds the description', async () => {
      const id = await store.addEndpoint({ path: '/test-3', description: 'test desc', });
      const endpoint = await store.getEndpoint(id);
      assert.equal(endpoint.description, 'test desc');
    });

    it('adds the summary', async () => {
      const id = await store.addEndpoint({ path: '/test-4', summary: 'test summary', });
      const endpoint = await store.getEndpoint(id);
      assert.equal(endpoint.summary, 'test summary');
    });
  });

  describe('deleteEndpoint()', () => {
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

    it('removes an endpoint from the API', async () => {
      const endpointsBefore = await demoStore.listEndpoints();
      await demoStore.deleteEndpoint(endpointsBefore[0].id);
      const endpointsAfter = await demoStore.listEndpoints();
      assert.equal(endpointsAfter.length, endpointsBefore.length - 1);
    });
  });

  describe('getEndpoint()', () => {
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

    it('reads endpoint by path', async () => {
      const result = await demoStore.getEndpoint('/people/{personId}');
      assert.typeOf(result, 'object');
      assert.equal(result.path, '/people/{personId}');
    });

    it('reads endpoint by id', async () => {
      const endpoints = await demoStore.listEndpoints();
      const result = await demoStore.getEndpoint(endpoints[0].id);
      assert.typeOf(result, 'object');
      assert.equal(result.id, endpoints[0].id);
    });

    it('has endpoint properties', async () => {
      const result = await demoStore.getEndpoint('/people/{personId}');
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
    let store = /** @type AmfStoreService */ (null);
    let id = /** @type string */ (null);

    before(async () => {
      store = new AmfStoreService();
      await store.init();
    });

    after(() => {
      store.worker.terminate();
    });

    beforeEach(async () => {
      await store.createWebApi();
      id = await store.addEndpoint({path: '/test'});
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

  describe('addOperation()', () => {
    let store = /** @type AmfStoreService */ (null);
    let id = /** @type string */ (null);

    before(async () => {
      store = new AmfStoreService();
      await store.init();
    });

    after(() => {
      store.worker.terminate();
    });

    beforeEach(async () => {
      await store.createWebApi();
      id = await store.addEndpoint({path: '/test'});
    });

    it('adds the operation', async () => {
      const opId = await store.addOperation(id, { method: 'get' });
      assert.typeOf(opId, 'string');
      const operation = await store.getOperation(opId);
      assert.equal(operation.id, opId);
    });

    it('adds the name', async () => {
      const opId = await store.addOperation(id, { method: 'get', name: 'test-name' });
      const operation = await store.getOperation(opId);
      assert.equal(operation.name, 'test-name');
    });

    it('adds the description', async () => {
      const opId = await store.addOperation(id, { method: 'get', description: 'test-description' });
      const operation = await store.getOperation(opId);
      assert.equal(operation.description, 'test-description');
    });

    it('adds the summary', async () => {
      const opId = await store.addOperation(id, { method: 'get', summary: 'test-summary' });
      const operation = await store.getOperation(opId);
      assert.equal(operation.summary, 'test-summary');
    });

    it('adds the deprecated', async () => {
      const opId = await store.addOperation(id, { method: 'get', deprecated: true });
      const operation = await store.getOperation(opId);
      assert.isTrue(operation.deprecated);
    });

    it('adds the schemes[]', async () => {
      const opId = await store.addOperation(id, { method: 'get', schemes: ['HTTP'] });
      const operation = await store.getOperation(opId);
      assert.deepEqual(operation.schemes, ['HTTP']);
    });

    it('adds the accepts[]', async () => {
      const opId = await store.addOperation(id, { method: 'get', accepts: ['application/xml'] });
      const operation = await store.getOperation(opId);
      assert.deepEqual(operation.accepts, ['application/xml']);
    });

    it('adds the contentType[]', async () => {
      const opId = await store.addOperation(id, { method: 'get', contentType: ['application/xml'] });
      const operation = await store.getOperation(opId);
      assert.deepEqual(operation.contentType, ['application/xml']);
    });
  });
});
