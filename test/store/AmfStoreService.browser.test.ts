import { assert, fixture, html } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { WebWorkerService, StoreEvents } from '../../src/worker.index.js';
import { workerValue, sendMessage } from '../../src/service/AmfStoreProxy.js';
import { optionsValue } from '../../src/service/WebWorkerService.js';
import { TestPersistance } from '../helpers/TestPersistance.js';
import { WorkerMessage } from '../../src/types.js';
import createTestService, { getAmfWorkerLocation } from '../helpers/web-service.js';

describe('WebWorkerService', () => {
  async function etFixture(): Promise<HTMLDivElement> {
    return fixture(html`<div></div>`);
  }

  describe('#worker', () => {
    let store: WebWorkerService;

    before(() => {
      store = createTestService();
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
    let store: WebWorkerService;

    it('has the set options', () => {
      const opts = {
        amfLocation: 'test',
      };
      store = new WebWorkerService(new TestPersistance('id'), opts);
      assert.isTrue(store.options === opts);
    });

    it('sets the [optionsValue] property', () => {
      const opts = {
        amfLocation: 'test',
      };
      store = new WebWorkerService(new TestPersistance('id'), opts);
      assert.isTrue(store[optionsValue] === opts);
    });
  });

  describe('#eventsTarget', () => {
    let store: WebWorkerService;

    it('sets the default events target', () => {
      store = createTestService();;
      assert.isTrue(store.eventsTarget === window);
    });

    it('sets the passed events target', () => {
      store = new WebWorkerService(new TestPersistance('id'), {
        eventsTarget: document.body,
        workerLocation: getAmfWorkerLocation(),
      });
      assert.isTrue(store.eventsTarget === document.body);
    });
  });

  describe('worker initialization', () => {
    let store: WebWorkerService;
    afterEach(() => {
      store.worker.terminate();
    });

    it('uses the createWebWorker() init option', async () => {
      let called = false;
      store = new WebWorkerService(new TestPersistance('id'), {
        createWebWorker: () => {
          called = true;
          return new Worker('./test/store/MockWorker.ts');
        }
      });
      await store.init();
      assert.isTrue(called);
    });

    it('uses the #workerLocation init option', async () => {
      store = new WebWorkerService(new TestPersistance('id'), { workerLocation: './test/store/MockWorker.ts' });
      const result = await store[sendMessage]('test-command', 'a', 'b', 'c') as WorkerMessage;
      assert.equal(result.type, 'test-command');
      assert.deepEqual(result.arguments, [ 'a', 'b', 'c' ]);
    });
  });

  describe('init()', () => {
    let store: WebWorkerService;
    let et: EventTarget;

    before(async () => {
      et = await etFixture();
      store = new WebWorkerService(new TestPersistance('id'), {
        eventsTarget: et,
        workerLocation: getAmfWorkerLocation(),
      });
    });

    after(() => {
      store.worker.terminate();
    });

    it('initializes the store', async () => {
      const result = store.init();
      assert.typeOf(result, 'promise');
      await result;
    });

    it('initializes the store with the event', async () => {
      const result = StoreEvents.Store.init(et);
      assert.typeOf(result, 'promise');
      await result;
    });
  });

  describe('loadGraph()', () => {
    let store: WebWorkerService;
    let et: EventTarget;

    before(async () => {
      et = await etFixture();
      store = new WebWorkerService(new TestPersistance('id'), {
        eventsTarget: et,
        workerLocation: getAmfWorkerLocation(),
      });
      await store.init();
    });

    after(() => {
      store.worker.terminate();
    });

    it('initializes the store with RAML API', async () => {
      const model = await AmfLoader.loadApi('demo-api.json');
      await store.loadGraph(model, 'RAML 1.0');
    });

    it('initializes the store with OAS 3 API', async () => {
      const model = await AmfLoader.loadApi('oas-3-api.json');
      await store.loadGraph(model, 'OAS 3.0');
    });

    it('initializes the store with Async API', async () => {
      const model = await AmfLoader.loadApi('streetlights.json');
      await store.loadGraph(model, 'ASYNC 2.0');
    });

    it('initializes the store via the event', async () => {
      const model = await AmfLoader.loadApi('streetlights.json');
      const result = StoreEvents.Store.loadGraph(model, 'ASYNC 2.0', et);
      assert.typeOf(result, 'promise');
      await result;
    });
  });

  describe('createWebApi()', () => {
    let store: WebWorkerService;
    let et: EventTarget;

    before(async () => {
      et = await etFixture();
      store = new WebWorkerService(new TestPersistance('id'), {
        eventsTarget: et,
        workerLocation: getAmfWorkerLocation(),
      });
      await store.init();
    });

    after(() => {
      store.worker.terminate();
    });

    it('initializes empty web API', async () => {
      await store.createWebApi();
      const api = await store.getApi();
      assert.equal(api.id, 'amf://document/web-api', 'has the id');
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

    it('creates the web api via the event', async () => {
      await StoreEvents.Api.createWebApi({
        name: 'test-api'
      }, et);
      const api = await store.getApi();
      assert.equal(api.name, 'test-api');
    });
  });

  describe('getApi()', () => {
    let demoStore: WebWorkerService;
    let oasStore: WebWorkerService;
    let demoApi: string;
    let oasApi: string;
    let et: EventTarget;

    before(async () => {
      et = await etFixture();
      demoApi = await AmfLoader.loadApi();
      demoStore = new WebWorkerService(new TestPersistance('id'), {
        eventsTarget: et,
        workerLocation: getAmfWorkerLocation(),
      });
      await demoStore.init();
      await demoStore.loadGraph(demoApi, 'RAML 1.0');

      oasApi = await AmfLoader.loadApi('oas-3-api.json');
      // this has intentionally different event target set so only one store listens on `et`
      oasStore = new WebWorkerService(new TestPersistance('id'), {
        eventsTarget: document.body,
        workerLocation: getAmfWorkerLocation(),
      });
      await oasStore.init();
      await oasStore.loadGraph(oasApi, 'OAS 3.0');
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
      assert.typeOf(api.endPoints[0], 'object', 'has the endPoint');
    });

    it('has servers property', async () => {
      const api = await demoStore.getApi();
      assert.typeOf(api.servers, 'array', 'has the servers');
      // RAML has only one server
      assert.lengthOf(api.servers, 1, 'has the single server');
      assert.typeOf(api.servers[0], 'object', 'has the server');
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
      assert.typeOf(api.documentations[0], 'object', 'has the documentation');
    });

    it('has multiple servers for OAS', async () => {
      const api = await oasStore.getApi();
      assert.typeOf(api.servers, 'array', 'has the servers');
      assert.lengthOf(api.servers, 4, 'has all the servers');
      assert.typeOf(api.servers[0], 'object', 'has the server');
    });

    it('has the termsOfService property', async () => {
      const api = await oasStore.getApi();
      assert.equal(api.termsOfService, 'http://example.com/terms/');
    });

    it('has the provider property', async () => {
      const api = await oasStore.getApi();
      assert.typeOf(api.provider, 'object', 'has the provider');
    });

    it('has the license property', async () => {
      const api = await oasStore.getApi();
      assert.typeOf(api.license, 'object', 'has the license');
    });

    it('reads the API via the event', async () => {
      const api = await StoreEvents.Api.get(et);
      assert.ok(api, 'the event returns a value')
      assert.equal(api.name, 'API body demo');
    });
  });

  describe('loadApi()', () => {
    let store: WebWorkerService;
    let et: EventTarget;
    
    before(async () => {
      et = await etFixture();
      store = new WebWorkerService(new TestPersistance('id'), {
        eventsTarget: et,
        workerLocation: getAmfWorkerLocation(),
      });
      await store.init();
    });

    after(() => {
      store.worker.terminate();
    });

    it('loads a RAML API with files', async () => {
      const api = `
#%RAML 1.0
title: API test
version: v1
uses:
  Types: types/api-types.raml
/path:
  get:
    responses:
      200:
        body:
          application/json:
            type: Types.Test
      `.trim();
      const library = `
#%RAML 1.0 Library
types:
  Test:
    type: object
    properties:
      test: string
      `.trim();
      const files = [
        {
          contents: api,
          path: 'api.raml',
        },
        {
          contents: library,
          path: 'types/api-types.raml',
        },
      ];
      await store.loadApi(files, 'RAML 1.0', 'application/raml10+yaml', 'api.raml');
      const project = await store.getApi();
      assert.lengthOf(project.endPoints, 1, 'has the API')
    });

    it('loads an OAS 3 API with files', async () => {
      const api = `openapi: '3.0.0'
info:
  title: Servers demo API
  version: '1.0'
  description: Test API for testing AMF service
servers:
  - url: https://development.gigantic-server.com/v1
    description: Development server
components:
  schemas:
    GeneralError:
      type: object
      properties:
        code:
          type: integer
          format: int32
paths:
  /test:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                type: string
      `.trim();
      const files = [
        {
          contents: api,
          path: 'api.yaml',
        },
      ];
      await store.loadApi(files, 'OAS 3.0', 'application/openapi30+yaml', 'api.yaml');
      const project = await store.getApi();
      assert.lengthOf(project.endPoints, 1, 'has the API')
    });

    it('loads an API with the event', async () => {
      const api = `
#%RAML 1.0
title: API test
version: v1
/path:
  get:
    responses:
      200:
        body:
          application/json:
            type: object
      `.trim();
      const files = [
        {
          contents: api,
          path: 'api.yaml',
        },
      ];
      await StoreEvents.Store.loadApi(files, 'api.yaml', 'RAML 1.0', 'application/raml10+yaml', et);
      const project = await store.getApi();
      assert.lengthOf(project.endPoints, 1, 'has the API')
    });
  });

  describe('hasApi()', () => {
    let store: WebWorkerService;
    let et: EventTarget;

    before(async () => {
      et = await etFixture();
      store = new WebWorkerService(new TestPersistance('id'), {
        eventsTarget: et,
        workerLocation: getAmfWorkerLocation(),
      });
    });

    after(() => {
      store.worker.terminate();
    });

    it('returns false before initialization', async () => {
      const result = await store.hasApi();
      assert.isFalse(result);
    });

    it('returns false after initialization', async () => {
      await store.init();
      const result = await store.hasApi();
      assert.isFalse(result);
    });

    it('returns true when has an API', async () => {
      await store.createWebApi();
      const result = await store.hasApi();
      assert.isTrue(result);
    });

    it('returns the value from the event', async () => {
      const result = await StoreEvents.Store.hasApi(et);
      assert.isTrue(result);
    });
  });

  describe('generateRaml()', () => {
    let store: WebWorkerService;
    let et: EventTarget;

    before(async () => {
      et = await etFixture();
      const demoApi = await AmfLoader.loadApi();
      store = new WebWorkerService(new TestPersistance('id'), {
        eventsTarget: et,
        workerLocation: getAmfWorkerLocation(),
      });
      await store.init();
      await store.loadGraph(demoApi, 'RAML 1.0');
    });

    after(() => {
      store.worker.terminate();
    });

    it('returns the generated RAML', async () => {
      const result = await store.generateRaml();
      assert.typeOf(result, 'string', 'has the result');
      assert.include(result, '#%RAML 1.0', 'has the RAML spec');
      assert.include(result, 'title: API body demo', 'has the API content');
    });
  });

  describe('generateGraph()', () => {
    let store: WebWorkerService;
    let et: EventTarget;

    before(async () => {
      et = await etFixture();
      const demoApi = await AmfLoader.loadApi();
      store = new WebWorkerService(new TestPersistance('id'), {
        eventsTarget: et,
        workerLocation: getAmfWorkerLocation(),
      });
      await store.init();
      await store.loadGraph(demoApi, 'RAML 1.0');
    });

    after(() => {
      store.worker.terminate();
    });

    it('returns the generated RAML', async () => {
      const result = await store.generateGraph();
      assert.typeOf(result, 'string', 'has the result');
      const parsed = JSON.parse(result);
      assert.typeOf(parsed, 'object', 'represents an object');
      assert.typeOf(parsed['@graph'], 'array', 'has the graph');
    });
  });
});
