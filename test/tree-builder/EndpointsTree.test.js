import { assert } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, EndpointsTree, ApiSorting } from '../../worker.index.js';

/** @typedef {import('../../worker.index').ApiEndpointsTreeItem} ApiEndpointsTreeItem */

describe('EndpointsTree', () => {
  describe('Building the tree from structured endpoints (RAML)', () => {
    let demoStore = /** @type AmfStoreService */ (null);
    let demoApi;
    let tree = /** @type ApiEndpointsTreeItem[] */ (null);
    
    before(async () => {
      demoApi = await AmfLoader.loadApi();
      demoStore = new AmfStoreService();
      await demoStore.init();
      await demoStore.loadGraph(demoApi);

      const endpoints = await demoStore.listEndpointsWithOperations();
      const sorted = ApiSorting.sortEndpointsByPath(endpoints);
      tree = new EndpointsTree().create(sorted); 
    });
  
    after(() => {
      demoStore.worker.terminate();
    });

    it('creates the tree structure', async () => {
      assert.typeOf(tree, 'array', 'the tree is an array');
      assert.isNotEmpty(tree, 'the tree is not empty');
    });

    it('all endpoints have the indent property', async () => {
      const found = tree.some((i) => typeof i.indent !== 'number');
      assert.isFalse(found, 'has no item with unset indent');
    });

    it('all endpoints have the label property', async () => {
      const found = tree.some((i) => typeof i.label !== 'string');
      assert.isFalse(found, 'has no item with unset label');
    });

    it('sets short path on the label when has parent', async () => {
      const item = tree.find((i) => i.path === '/messages/bulk');
      assert.equal(item.label, '/bulk', 'has the short label');
      assert.isTrue(item.hasShortPath, 'has the hasShortPath property');
    });

    it('does not set hasChildren when no children', async () => {
      const item = tree.find((i) => i.path === '/arrayBody');
      assert.isUndefined(item.hasChildren);
    });

    it('sets hasChildren when has children', async () => {
      const item = tree.find((i) => i.path === '/messages');
      assert.isTrue(item.hasChildren);
    });
    
    it('increases indent for a child', async () => {
      const item = tree.find((i) => i.path === '/messages/bulk');
      assert.equal(item.indent, 1);
    });
    
    it('increases indent for a sub-child', async () => {
      const item = tree.find((i) => i.path === '/orgs/{orgId}/managers');
      assert.equal(item.indent, 2);
    });
  });

  describe('Building the tree from simple structure (OAS)', () => {
    let oasStore = /** @type AmfStoreService */ (null);
    let oasApi;
    let tree = /** @type ApiEndpointsTreeItem[] */ (null);

    before(async () => {
      oasApi = await AmfLoader.loadApi('oas-3-api.json');
      oasStore = new AmfStoreService();
      await oasStore.init();
      await oasStore.loadGraph(oasApi);

      const endpoints = await oasStore.listEndpointsWithOperations();
      const sorted = ApiSorting.sortEndpointsByPath(endpoints);
      tree = new EndpointsTree().create(sorted); 
    });

    after(() => {
      oasStore.worker.terminate();
    });

    it('creates the tree structure', async () => {
      assert.typeOf(tree, 'array', 'the tree is an array');
      assert.lengthOf(tree, 2, 'has 2 endpoints');
    });

    it('has labels', async () => {
      assert.equal(tree[0].label, '/default');
      assert.equal(tree[1].label, '/pets');
    });

    it('has indents', async () => {
      assert.equal(tree[0].indent, 0);
      assert.equal(tree[1].indent, 0);
    });
  });

  // These suite tests whether the library creates a virtual endpoints to
  // simplify paths in the three. This API has no structure as a RAML API normally 
  // would and endpoints are declared as a flat list. The library creates the structure for it.
  describe('Building the tree from no structure (Async)', () => {
    let store = /** @type AmfStoreService */ (null);
    let api;
    let tree = /** @type ApiEndpointsTreeItem[] */ (null);

    before(async () => {
      api = await AmfLoader.loadApi('streetlights.json');
      store = new AmfStoreService();
      await store.init();
      await store.loadGraph(api);

      const endpoints = await store.listEndpointsWithOperations();
      const sorted = ApiSorting.sortEndpointsByPath(endpoints);
      tree = new EndpointsTree().create(sorted); 
    });

    after(() => {
      store.worker.terminate();
    });

    it('creates a "virtual" parent', async () => {
      const [item] = tree;
      assert.isUndefined(item.id, 'virtual endpoints have no ids');
      assert.equal(item.indent, 0, 'has indent = 0');
      assert.equal(item.path, 'smartylighting/streetlights/1/0', 'has the smallest common path');
      assert.equal(item.label, item.path, 'has the label');
      assert.deepEqual(item.operations, [], 'has no operations');
      assert.isTrue(item.hasChildren, 'virtual endpoint always have children');
    });

    it('creates 2nd degree "virtual" parent', async () => {
      const item = tree[1];
      assert.isUndefined(item.id, 'virtual endpoints have no ids');
      assert.equal(item.indent, 1, 'has indent');
      assert.equal(item.path, 'smartylighting/streetlights/1/0/action/{streetlightId}', 'has the smallest common path');
      assert.equal(item.label, '/action/{streetlightId}', 'has the label');
      assert.deepEqual(item.operations, [], 'has no operations');
      assert.isTrue(item.hasChildren, 'virtual endpoint always have children');
    });

    it('creates a real endpoint item', async () => {
      const item = tree[2];
      assert.typeOf(item.id, 'string', 'has the id');
      assert.equal(item.indent, 2, 'has the indent');
      assert.equal(item.path, 'smartylighting/streetlights/1/0/action/{streetlightId}/dim', 'has the full path');
      assert.equal(item.label, '/dim', 'has the short label');
      assert.isTrue(item.hasShortPath, 'has the hasShortPath');
    });

    it('creates an item for a path that has parent more than one previous path', async () => {
      // The last path in this API has a common path with the fist path, but no others.
      const item = tree[5];
      assert.typeOf(item.id, 'string', 'has the id');
      assert.equal(item.indent, 1, 'has the indent');
      assert.equal(item.path, 'smartylighting/streetlights/1/0/event/{streetlightId}/lighting/measured', 'has the full path');
      assert.equal(item.label, '/event/{streetlightId}/lighting/measured', 'has the short label');
      assert.isTrue(item.hasShortPath, 'has the hasShortPath');
    });
  });
});
