import { assert, oneEvent } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, StoreEvents, StoreEventTypes, ns } from '../../worker.index.js';

/** @typedef {import('../../').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('../../').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */

describe('AmfStoreService', () => {
  let demoStore = /** @type AmfStoreService */ (null);
  let oasStore = /** @type AmfStoreService */ (null);
  const demoEt = document.createElement('span');

  before(async () => {
    demoStore = new AmfStoreService(demoEt);
    await demoStore.init();
    // event target is set intentionally
    oasStore = new AmfStoreService(document.body);
    await oasStore.init();
  });

  after(() => {
    demoStore.worker.terminate();
    oasStore.worker.terminate();
  });

  describe('listServers()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await demoStore.loadGraph(demoApi);

      const oasApi = await AmfLoader.loadApi('oas-3-api.json');
      await oasStore.loadGraph(oasApi);
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

    it('lists servers with the DOM event', async () => {
      const result = await StoreEvents.Server.list(demoEt);
      assert.typeOf(result, 'array')
    });
  });

  describe('addServer()', () => {
    beforeEach(async () => {
      await demoStore.createWebApi();
    });

    it('adds a server to the API', async () => {
      const added = await demoStore.addServer({ url: 'https://test.com' });
      assert.typeOf(added, 'object', 'returns created server');
      const [server] = await demoStore.listServers();
      assert.typeOf(server, 'object', 'has the server');
      assert.equal(server.url, 'https://test.com', 'has the passed url');
      assert.deepEqual(server.variables, [], 'has no variables');
    });

    it('sets a description', async () => {
      await demoStore.addServer({ url: 'https://test.com', description: 'test-desc' });
      const [server] = await demoStore.listServers();
      assert.equal(server.description, 'test-desc');
    });

    it('adds new variables to the server', async () => {
      await demoStore.addServer({ url: 'https://test.com/{path}/{other}', variables: ['path', 'other'] });
      const [server] = await demoStore.listServers();
      assert.lengthOf(server.variables, 2, 'has created variables');
    });

    it('adds the server via the event', async () => {
      await StoreEvents.Server.add(demoEt, { url: 'https://test.com' });
      const [server] = await demoStore.listServers();
      assert.equal(server.url, 'https://test.com', 'has the passed url');
    });

    it('dispatches the created event', async () => {
      demoStore.addServer({ url: 'https://test.com' });
      const e = await oneEvent(demoEt, StoreEventTypes.Server.State.created);
      const record = e.detail;
      assert.typeOf(record.graphId, 'string', 'has the created id');
      assert.equal(record.domainType, ns.aml.vocabularies.apiContract.Server, 'has the domainType');
      assert.isUndefined(record.domainParent, 'domainParent is undefined');
      assert.typeOf(record.item, 'object', 'has the created item');
    });
  });

  describe('getServer()', () => {
    let ids = /** @type string[] */ (null);

    before(async () => {
      const oasApi = await AmfLoader.loadApi('oas-3-api.json');
      await oasStore.loadGraph(oasApi);
      const servers = await oasStore.listServers();
      ids = servers.map((s) => s.id);
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

    it('reads the server via the event', async () => {
      const srv = await StoreEvents.Server.get(document.body, ids[1]);
      assert.equal(srv.description, 'Staging server');
    });
  });
});
