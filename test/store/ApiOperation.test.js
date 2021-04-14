import { assert, oneEvent } from '@open-wc/testing';
import { ns } from '@api-components/amf-helper-mixin/src/Namespace.js';
// import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, StoreEvents, StoreEventTypes } from '../../worker.index.js';

/** @typedef {import('../../').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('../../').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('../..').ApiScalarShape} ApiScalarShape */
/** @typedef {import('../..').ApiNodeShape} ApiNodeShape */
/** @typedef {import('../..').ApiFileShape} ApiFileShape */
/** @typedef {import('../..').ApiSchemaShape} ApiSchemaShape */
/** @typedef {import('../..').ApiTupleShape} ApiTupleShape */

describe('AmfStoreService', () => {
  let store = /** @type AmfStoreService */ (null);
  before(async () => {
    store = new AmfStoreService();
    await store.init();
  });

  after(() => {
    store.worker.terminate();
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
      const e = await oneEvent(window, StoreEventTypes.Operation.State.created);
      const { detail } = e;
      assert.typeOf(detail.graphId, 'string', 'has the graphId');
      assert.equal(detail.domainType, ns.aml.vocabularies.apiContract.Operation, 'has the domainType');
      assert.typeOf(detail.item, 'object', 'has the item');
    });

    it('creates an operation from the event', async () => {
      const result = await StoreEvents.Operation.add(window, id, { method: 'get' });
      const stored = await store.getOperation(result.id);
      assert.deepEqual(stored, result);
    });
  });

  describe('getOperation()', () => {
    let id = /** @type string */ (null);
    const path = '/test';

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
        accepts: ['application/json'],
        contentType: ['application/xml'],
        deprecated: true,
        description: 'test op description',
        name: 'test name',
        schemes: ['HTTPS'],
        summary: 'op summary',
      });
      id = op.id;
    });

    it('returns an object for the id parameter', async () => {
      const result = await store.getOperation(id);
      assert.typeOf(result, 'object');
    });

    it('returns an object for the path and method parameter', async () => {
      const result = await store.getOperation('get', '/test');
      assert.typeOf(result, 'object');
    });

    it('has the id', async () => {
      const result = await store.getOperation(id);
      assert.equal(result.id, id);
    });

    it('has the method', async () => {
      const result = await store.getOperation(id);
      assert.equal(result.method, 'get');
    });

    it('has the accepts', async () => {
      const result = await store.getOperation(id);
      assert.deepEqual(result.accepts, ['application/json']);
    });

    it('has the contentType', async () => {
      const result = await store.getOperation(id);
      assert.deepEqual(result.contentType, ['application/xml']);
    });

    it('has the schemes', async () => {
      const result = await store.getOperation(id);
      assert.deepEqual(result.schemes, ['HTTPS']);
    });

    it('has the deprecated', async () => {
      const result = await store.getOperation(id);
      assert.isTrue(result.deprecated);
    });

    it('has the description', async () => {
      const result = await store.getOperation(id);
      assert.equal(result.description, 'test op description');
    });

    it('has the name', async () => {
      const result = await store.getOperation(id);
      assert.equal(result.name, 'test name');
    });

    it('has the summary', async () => {
      const result = await store.getOperation(id);
      assert.equal(result.summary, 'op summary');
    });

    it('has the types', async () => {
      const result = await store.getOperation(id);
      assert.typeOf(result.types, 'array');
    });

    it('reads the object from the event', async () => {
      const result = await StoreEvents.Operation.get(window, id);
      assert.equal(result.id, id);
    });
  });

  describe('deleteOperation()', () => {
    let id = /** @type string */ (null);
    const path = '/test';

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      id = op.id;
    });

    it('removes the object from the store', async () => {
      await store.deleteOperation(id);
      let thrown = false;
      try {
        await store.getOperation(id);
      } catch (e) {
        thrown = true;
      }
      assert.isTrue(thrown);
    });

    it('removes the object from the store with the event', async () => {
      await StoreEvents.Operation.delete(window, id);
      let thrown = false;
      try {
        await store.getOperation(id);
      } catch (e) {
        thrown = true;
      }
      assert.isTrue(thrown);
    });

    it('dispatches the delete event', async () => {
      store.deleteOperation(id);
      const e = await oneEvent(window, StoreEventTypes.Operation.State.deleted);
      const { detail } = e;
      assert.equal(detail.graphId, id, 'has the graphId');
      assert.equal(detail.domainType, ns.aml.vocabularies.apiContract.Operation, 'has the graphType');
    });
  });

  describe('updateOperationProperty()', () => {
    let id = /** @type string */ (null);
    const path = '/test';

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
        accepts: ['application/json'],
        contentType: ['application/xml'],
        deprecated: true,
        description: 'test op description',
        name: 'test name',
        schemes: ['HTTPS'],
        summary: 'op summary',
      });
      id = op.id;
    });

    it('returns the updated object', async () => {
      const result = await store.updateOperationProperty(id, 'name', 'test');
      assert.typeOf(result, 'object');
    });

    it('updates the method', async () => {
      const result = await store.updateOperationProperty(id, 'method', 'post');
      assert.equal(result.method, 'post');
    });

    it('updates the accepts', async () => {
      const result = await store.updateOperationProperty(id, 'accepts', ['application/test']);
      assert.deepEqual(result.accepts, ['application/test']);
    });

    it('updates the contentType', async () => {
      const result = await store.updateOperationProperty(id, 'contentType', ['application/test']);
      assert.deepEqual(result.contentType, ['application/test']);
    });

    it('updates the schemes', async () => {
      const result = await store.updateOperationProperty(id, 'schemes', ['FILE']);
      assert.deepEqual(result.schemes, ['FILE']);
    });

    it('updates the deprecated', async () => {
      const result = await store.updateOperationProperty(id, 'deprecated', false);
      assert.isFalse(result.deprecated);
    });

    it('updates the description', async () => {
      const result = await store.updateOperationProperty(id, 'description', 'updated description');
      assert.equal(result.description, 'updated description');
    });

    it('updates the name', async () => {
      const result = await store.updateOperationProperty(id, 'name', 'updated name');
      assert.equal(result.name, 'updated name');
    });

    it('updates the summary', async () => {
      const result = await store.updateOperationProperty(id, 'summary', 'updated summary');
      assert.equal(result.summary, 'updated summary');
    });

    it('updates the object from the event', async () => {
      await StoreEvents.Operation.update(window, id, 'method', 'post');
      const result = await store.getOperation(id);
      assert.equal(result.method, 'post');
    });

    it('dispatches the change event', async () => {
      store.updateOperationProperty(id, 'name', 'test');
      const e = await oneEvent(window, StoreEventTypes.Operation.State.updated);
      const { detail } = e;
      assert.equal(detail.graphId, id, 'has the graphId');
      assert.equal(detail.domainType, ns.aml.vocabularies.apiContract.Operation, 'has the graphType');
      assert.equal(detail.property, 'name', 'has the property');
      assert.typeOf(detail.item, 'object', 'has the item');
    });
  });
});
