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

  describe('getOperationParent()', () => {
    let id = /** @type string */ (null);
    let epId = /** @type string */ (null);
    const path = '/test';

    beforeEach(async () => {
      await store.createWebApi();
      epId = (await store.addEndpoint({ path })).id;
      const op = await store.addOperation(epId, { 
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

    it('returns an endpoint', async () => {
      const result = await store.getOperationParent(id);
      assert.typeOf(result, 'object', 'is the object');
      const [type] = result.types;
      assert.equal(type, ns.aml.vocabularies.apiContract.EndPoint);
    });

    it('returns operation parent', async () => {
      const result = await store.getOperationParent(id);
      assert.equal(result.id, epId, 'has the id of the created endpoint');
    });

    it('parent has the operation as child', async () => {
      const result = await store.getOperationParent(id);
      assert.include(result.operations, id);
    });

    it('reads the parent via the event', async () => {
      const result = await StoreEvents.Operation.getParent(window, id);
      assert.typeOf(result, 'object', 'is the object');
      const [type] = result.types;
      assert.equal(type, ns.aml.vocabularies.apiContract.EndPoint);
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

  describe('addResponse()', () => {
    let opId = /** @type string */ (null);
    const path = '/test';

    const init = { name: 'A name' };

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      opId = op.id;
    });

    it('returns the created response', async () => {
      const result = await store.addResponse(opId, init);
      assert.typeOf(result, 'object', 'returns an object');
      const [type] = result.types;
      assert.equal(type, ns.aml.vocabularies.apiContract.Response);
    });

    it('adds the response to the operation responses list', async () => {
      const response = await store.addResponse(opId, init);
      const operation = await store.getOperation(opId);
      assert.deepEqual(operation.responses, [response.id]);
    });

    it('adds the name property', async () => {
      const response = await store.addResponse(opId, { ...init });
      assert.equal(response.name, 'A name');
    });

    it('adds the statusCode property', async () => {
      const response = await store.addResponse(opId, { ...init, statusCode: '400' });
      assert.equal(response.statusCode, '400');
    });

    it('adds the description property', async () => {
      const response = await store.addResponse(opId, { ...init, description: 'test desc' });
      assert.equal(response.description, 'test desc');
    });

    it('adds the headers', async () => {
      const response = await store.addResponse(opId, { ...init, headers: ['h1', 'h2'] });
      assert.lengthOf(response.headers, 2, 'has both headers');
      const [id] = response.headers;
      const param = await store.getParameter(id);
      assert.equal(param.name, 'h1', 'header has the name');
      assert.equal(param.binding, 'header', 'header has the binding');
    });

    it('adds the payloads', async () => {
      const response = await store.addResponse(opId, { ...init, payloads: ['application/json', 'application/xml'] });
      assert.lengthOf(response.payloads, 2, 'has both payloads');
      const [id] = response.payloads;
      const param = await store.getPayload(id);
      assert.equal(param.mediaType, 'application/json', 'payload has the mediaType');
    });

    it('adds the response via the event', async () => {
      const response = await StoreEvents.Operation.addResponse(window, opId, { ...init });
      const operation = await store.getOperation(opId);
      assert.deepEqual(operation.responses, [response.id]);
    });

    it('dispatches the response created event', async () => {
      StoreEvents.Operation.addResponse(window, opId, { ...init });
      const e = await oneEvent(window, StoreEventTypes.Response.State.created);
      const record = e.detail;
      assert.typeOf(record.graphId, 'string', 'has the created id');
      assert.equal(record.domainType, ns.aml.vocabularies.apiContract.Response, 'has the domainType');
      assert.equal(record.domainParent, opId, 'has the domainParent');
      assert.typeOf(record.item, 'object', 'has the created item');
    });
  });

  describe('deleteResponse()', () => {
    let opId = /** @type string */ (null);
    let responseId = /** @type string */ (null);
    
    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      opId = (await store.addOperation(ep.id, { method: 'get' })).id;
      const response = await store.addResponse(opId, { name: 'test' });
      responseId = response.id;
    });

    it('removes the response from the graph', async () => {
      await store.deleteResponse(responseId, opId);
      let thrown = false;
      try {
        await store.getResponse(responseId);
      } catch (e) {
        thrown = true;
      }
      assert.isTrue(thrown, 'Throws the error');
    });

    it('removes the response from the operation', async () => {
      await store.deleteResponse(responseId, opId);
      const operation = await store.getOperation(opId);
      assert.deepEqual(operation.responses, []);
    });

    it('deletes the response via the event', async () => {
      await StoreEvents.Operation.removeResponse(window, responseId, opId);
      const operation = await store.getOperation(opId);
      assert.deepEqual(operation.responses, []);
    });

    it('dispatches the delete event', async () => {
      StoreEvents.Operation.removeResponse(window, responseId, opId);
      const e = await oneEvent(window, StoreEventTypes.Response.State.deleted);
      const record = e.detail;
      assert.equal(record.graphId, responseId, 'has the response id');
      assert.equal(record.domainType, ns.aml.vocabularies.apiContract.Response, 'has the domainType');
      assert.equal(record.domainParent, opId, 'has the domainParent');
    });
  });

  describe('addRequest()', () => {
    let opId = /** @type string */ (null);
    const init = { };

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      opId = op.id;
    });

    it('returns the created request', async () => {
      const result = await store.addRequest(opId, init);
      assert.typeOf(result, 'object', 'returns an object');
      const [type] = result.types;
      assert.equal(type, ns.aml.vocabularies.apiContract.Request);
    });

    it('adds the request to the operation definition', async () => {
      const request = await store.addRequest(opId, init);
      const operation = await store.getOperation(opId);
      assert.deepEqual(operation.request, request.id);
    });

    it('adds the description property', async () => {
      const response = await store.addRequest(opId, { ...init, description: 'test desc' });
      assert.equal(response.description, 'test desc');
    });

    it('adds the required property', async () => {
      const response = await store.addRequest(opId, { ...init, required: true });
      assert.isTrue(response.required);
    });

    it('adds the headers', async () => {
      const request = await store.addRequest(opId, { ...init, headers: ['h1', 'h2'] });
      assert.lengthOf(request.headers, 2, 'has both headers');
      const [id] = request.headers;
      const param = await store.getParameter(id);
      assert.equal(param.name, 'h1', 'header has the name');
      assert.equal(param.binding, 'header', 'header has the binding');
    });

    it('adds the payloads', async () => {
      const request = await store.addRequest(opId, { ...init, payloads: ['application/json', 'application/xml'] });
      assert.lengthOf(request.payloads, 2, 'has both payloads');
      const [id] = request.payloads;
      const param = await store.getPayload(id);
      assert.equal(param.mediaType, 'application/json', 'payload has the mediaType');
    });

    it('adds the queryParameters', async () => {
      const request = await store.addRequest(opId, { ...init, queryParameters: ['a', 'b'] });
      assert.lengthOf(request.queryParameters, 2, 'has all created query parameters');
      const [id] = request.queryParameters;
      const param = await store.getParameter(id);
      assert.equal(param.name, 'a', 'query parameters has the name');
      assert.equal(param.binding, 'query', 'query parameters has the binding');
    });

    it('adds the uriParameters', async () => {
      const request = await store.addRequest(opId, { ...init, uriParameters: ['c', 'd'] });
      assert.lengthOf(request.uriParameters, 2, 'has all created query parameters');
      const [id] = request.uriParameters;
      const param = await store.getParameter(id);
      assert.equal(param.name, 'c', 'query parameters has the name');
      assert.equal(param.binding, 'url', 'query parameters has the binding');
    });

    it('adds the cookieParameters', async () => {
      const request = await store.addRequest(opId, { ...init, cookieParameters: ['e', 'f'] });
      assert.lengthOf(request.cookieParameters, 2, 'has all created query parameters');
      const [id] = request.cookieParameters;
      const param = await store.getParameter(id);
      assert.equal(param.name, 'e', 'query parameters has the name');
      assert.equal(param.binding, 'cookie', 'query parameters has the binding');
    });

    it('adds the request via the event', async () => {
      const request = await StoreEvents.Operation.addRequest(window, opId, { ...init });
      const operation = await store.getOperation(opId);
      assert.deepEqual(operation.request, request.id);
    });

    it('dispatches the request created event', async () => {
      StoreEvents.Operation.addRequest(window, opId, { ...init });
      const e = await oneEvent(window, StoreEventTypes.Request.State.created);
      const record = e.detail;
      assert.typeOf(record.graphId, 'string', 'has the created id');
      assert.equal(record.domainType, ns.aml.vocabularies.apiContract.Request, 'has the domainType');
      assert.equal(record.domainParent, opId, 'has the domainParent');
      assert.typeOf(record.item, 'object', 'has the created item');
    });
  });

  describe('deleteRequest()', () => {
    let opId = /** @type string */ (null);
    let requestId = /** @type string */ (null);
    
    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      opId = (await store.addOperation(ep.id, { method: 'get' })).id;
      const response = await store.addRequest(opId);
      requestId = response.id;
    });

    it('removes the request from the graph', async () => {
      await store.deleteRequest(requestId, opId);
      let thrown = false;
      try {
        const request = await store.getRequest(requestId);
        console.log(request);
      } catch (e) {
        thrown = true;
      }
      assert.isTrue(thrown, 'Throws the error');
    });

    it('removes the request from the operation', async () => {
      await store.deleteRequest(requestId, opId);
      const operation = await store.getOperation(opId);
      assert.isUndefined(operation.request);
    });

    it('deletes the response via the event', async () => {
      await StoreEvents.Operation.removeRequest(window, requestId, opId);
      const operation = await store.getOperation(opId);
      assert.isUndefined(operation.request);
    });

    it('dispatches the delete event', async () => {
      StoreEvents.Operation.removeRequest(window, requestId, opId);
      const e = await oneEvent(window, StoreEventTypes.Request.State.deleted);
      const record = e.detail;
      assert.equal(record.graphId, requestId, 'has the request id');
      assert.equal(record.domainType, ns.aml.vocabularies.apiContract.Request, 'has the domainType');
      assert.equal(record.domainParent, opId, 'has the domainParent');
    });
  });
});
