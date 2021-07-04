import { assert, oneEvent } from '@open-wc/testing';
// import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, StoreEvents, StoreEventTypes, ns } from '../../worker.index.js';

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

  describe('addRequest()', () => {
    let id = /** @type string */ (null);

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      id = op.id;
    });

    it('returns an object', async () => {
      const result = await store.addRequest(id);
      assert.typeOf(result, 'object');
    });

    it('has the request type', async () => {
      const result = await store.addRequest(id);
      assert.typeOf(result.types, 'array', 'has the types');
      assert.include(result.types, ns.aml.vocabularies.apiContract.Request, 'has the request type');
    });

    it('returns the "required"', async () => {
      const result = await store.addRequest(id, { required: true });
      assert.isTrue(result.required);
    });

    it('has default cookieParameters', async () => {
      const result = await store.addRequest(id);
      assert.deepEqual(result.cookieParameters, []);
    });

    it('has default queryParameters', async () => {
      const result = await store.addRequest(id);
      assert.deepEqual(result.queryParameters, []);
    });

    it('has default uriParameters', async () => {
      const result = await store.addRequest(id);
      assert.deepEqual(result.uriParameters, []);
    });

    it('has default headers', async () => {
      const result = await store.addRequest(id);
      assert.deepEqual(result.headers, []);
    });

    it('has default payloads', async () => {
      const result = await store.addRequest(id);
      assert.deepEqual(result.payloads, []);
    });

    it('has set cookieParameters', async () => {
      const result = await store.addRequest(id, { cookieParameters: ['test'] });
      assert.lengthOf(result.cookieParameters, 1, 'has created cookieParameters');
      assert.typeOf(result.cookieParameters[0], 'string');
    });

    it('has set queryParameters', async () => {
      const result = await store.addRequest(id, { queryParameters: ['test'] });
      assert.lengthOf(result.queryParameters, 1, 'has created queryParameters');
      assert.typeOf(result.queryParameters[0], 'string');
    });

    it('has set uriParameters', async () => {
      const result = await store.addRequest(id, { uriParameters: ['test'] });
      assert.lengthOf(result.uriParameters, 1, 'has created uriParameters');
      assert.typeOf(result.uriParameters[0], 'string');
    });

    it('has set headers', async () => {
      const result = await store.addRequest(id, { headers: ['test'] });
      assert.lengthOf(result.headers, 1, 'has created headers');
      assert.typeOf(result.headers[0], 'string');
    });

    it('has set payloads', async () => {
      const result = await store.addRequest(id, { payloads: ['test'] });
      assert.lengthOf(result.payloads, 1, 'has created payloads');
      assert.typeOf(result.payloads[0], 'string');
    });

    it('returns the "description"', async () => {
      const result = await store.addRequest(id, { description: 'test' });
      assert.equal(result.description, 'test');
    });

    it('creates the object from the event', async () => {
      const result = await StoreEvents.Operation.addRequest(window, id, { description: 'test' });
      assert.equal(result.description, 'test');
    });

    it('dispatches the created event', async () => {
      const p = StoreEvents.Operation.addRequest(window, id, { description: 'test' });
      const e = await oneEvent(window, StoreEventTypes.Request.State.created);
      const created = await p;
      assert.equal(e.detail.graphId, created.id, 'has the graphId');
      assert.equal(e.detail.domainType, ns.aml.vocabularies.apiContract.Request, 'has the domainType');
      assert.equal(e.detail.domainParent, id, 'has the domainParent');
      assert.deepEqual(e.detail.item, created, 'has the item');
    });
  });

  describe('getRequest()', () => {
    let id = /** @type string */ (null);

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      const request = await store.addRequest(op.id, { 
        required: true,
        description: 'this is a request', 
        headers: ['h1', 'h2'],
        cookieParameters: ['c1', 'c2'],
        queryParameters: ['q1', 'q2'],
        uriParameters: ['u1', 'u2'],
        payloads: ['application/json', 'application/xml'],
      });
      id = request.id;
    });

    it('returns an object for the id parameter', async () => {
      const result = await store.getRequest(id);
      assert.typeOf(result, 'object');
    });

    it('has the id', async () => {
      const result = await store.getRequest(id);
      assert.equal(result.id, id);
    });

    it('has the required', async () => {
      const result = await store.getRequest(id);
      assert.isTrue(result.required);
    });

    it('has the description', async () => {
      const result = await store.getRequest(id);
      assert.equal(result.description, 'this is a request');
    });

    it('has the headers', async () => {
      const result = await store.getRequest(id);
      assert.typeOf(result.headers, 'array', 'headers is an array');
      assert.lengthOf(result.headers, 2, 'has all headers');
      assert.typeOf(result.headers[0], 'string', 'headers are string');
    });

    it('has the cookieParameters', async () => {
      const result = await store.getRequest(id);
      assert.typeOf(result.cookieParameters, 'array', 'cookieParameters is an array');
      assert.lengthOf(result.cookieParameters, 2, 'has all cookieParameters');
      assert.typeOf(result.cookieParameters[0], 'string', 'cookieParameters are string');
    });

    it('has the queryParameters', async () => {
      const result = await store.getRequest(id);
      assert.typeOf(result.queryParameters, 'array', 'queryParameters is an array');
      assert.lengthOf(result.queryParameters, 2, 'has all queryParameters');
      assert.typeOf(result.queryParameters[0], 'string', 'queryParameters are string');
    });

    it('has the uriParameters', async () => {
      const result = await store.getRequest(id);
      assert.typeOf(result.uriParameters, 'array', 'uriParameters is an array');
      assert.lengthOf(result.uriParameters, 2, 'has all uriParameters');
      assert.typeOf(result.uriParameters[0], 'string', 'uriParameters are string');
    });

    it('has the types', async () => {
      const result = await store.getRequest(id);
      assert.typeOf(result.types, 'array');
    });

    it('reads the object from the event', async () => {
      const result = await StoreEvents.Request.get(window, id);
      assert.equal(result.id, id);
    });
  });

  describe('getRequestRecursive()', () => {
    let id = /** @type string */ (null);

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      const request = await store.addRequest(op.id, { 
        required: true,
        description: 'this is a request', 
        headers: ['h1', 'h2'],
        cookieParameters: ['c1', 'c2'],
        queryParameters: ['q1', 'q2'],
        uriParameters: ['u1', 'u2'],
        payloads: ['application/json', 'application/xml'],
      });
      id = request.id;
    });

    it('has the headers', async () => {
      const result = await store.getRequestRecursive(id);
      assert.typeOf(result.headers, 'array', 'headers is an array');
      assert.lengthOf(result.headers, 2, 'has all headers');
      assert.typeOf(result.headers[0], 'object', 'headers are string');
    });

    it('has the cookieParameters', async () => {
      const result = await store.getRequestRecursive(id);
      assert.typeOf(result.cookieParameters, 'array', 'cookieParameters is an array');
      assert.lengthOf(result.cookieParameters, 2, 'has all cookieParameters');
      assert.typeOf(result.cookieParameters[0], 'object', 'cookieParameters are string');
    });

    it('has the queryParameters', async () => {
      const result = await store.getRequestRecursive(id);
      assert.typeOf(result.queryParameters, 'array', 'queryParameters is an array');
      assert.lengthOf(result.queryParameters, 2, 'has all queryParameters');
      assert.typeOf(result.queryParameters[0], 'object', 'queryParameters are string');
    });

    it('has the uriParameters', async () => {
      const result = await store.getRequestRecursive(id);
      assert.typeOf(result.uriParameters, 'array', 'uriParameters is an array');
      assert.lengthOf(result.uriParameters, 2, 'has all uriParameters');
      assert.typeOf(result.uriParameters[0], 'object', 'uriParameters are string');
    });

    it('has the types', async () => {
      const result = await store.getRequestRecursive(id);
      assert.typeOf(result.types, 'array');
    });

    it('reads the object from the event', async () => {
      const result = await StoreEvents.Request.getRecursive(window, id);
      assert.lengthOf(result.headers, 2, 'has all headers');
      assert.typeOf(result.headers[0], 'object', 'headers are string');
    });
  });

  describe('addRequestHeader()', () => {
    let id = /** @type string */ (null);
    const defaultInit = Object.freeze({ name: 'x-header' });

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      const request = await store.addRequest(op.id);
      id = request.id;
    });

    it('returns an object', async () => {
      const result = await store.addRequestHeader(id, defaultInit);
      assert.typeOf(result, 'object');
    });

    it('stores the Parameter in the store', async () => {
      const param = await store.addRequestHeader(id, defaultInit);
      const result = await store.getParameter(param.id);
      assert.include(result.types, ns.aml.vocabularies.apiContract.Parameter, 'has the Parameter type');
    });

    it('creates the header from the event', async () => {
      const result = await StoreEvents.Request.addHeader(window, id, defaultInit);
      assert.typeOf(result, 'object');
    });

    it('dispatches parameter created event', async () => {
      const p = StoreEvents.Request.addHeader(window, id, defaultInit);
      const e = await oneEvent(window, StoreEventTypes.Parameter.State.created);
      const created = await p;
      assert.equal(e.detail.graphId, created.id, 'has the graphId');
      assert.equal(e.detail.domainType, ns.aml.vocabularies.apiContract.Parameter, 'has the domainType');
      assert.equal(e.detail.domainParent, id, 'has the domainParent');
      assert.deepEqual(e.detail.item, created, 'has the item');
    });

    it('has the Parameter type', async () => {
      const result = await store.addRequestHeader(id, defaultInit);
      assert.typeOf(result.types, 'array', 'has the types');
      assert.include(result.types, ns.aml.vocabularies.apiContract.Parameter, 'has the Parameter type');
    });

    it('has the id', async () => {
      const result = await store.addRequestHeader(id, defaultInit);
      assert.typeOf(result.id, 'string');
    });

    it('has the name', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit });
      assert.equal(result.name, 'x-header');
    });

    it('has the allowEmptyValue', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit, allowEmptyValue: true });
      assert.equal(result.allowEmptyValue, true);
    });

    it('has the allowReserved', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit, allowReserved: true });
      assert.equal(result.allowReserved, true);
    });

    it('has the binding', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit });
      assert.equal(result.binding, 'header');
    });

    it('overrides the binding', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit, binding: 'other' });
      assert.equal(result.binding, 'other');
    });

    it('has no schema by default', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit });
      assert.isUndefined(result.schema);
    });

    it('creates the schema', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit, dataType: 'boolean' });
      assert.typeOf(result.schema, 'string', 'has the schema');
      const schema = await store.getType(result.schema);
      assert.include(schema.types, ns.aml.vocabularies.shapes.ScalarShape, 'is a scalar');
      // @ts-ignore
      assert.equal(schema.dataType, ns.w3.xmlSchema.boolean, 'has the data type');
    });

    it('has the deprecated', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit, deprecated: true });
      assert.equal(result.deprecated, true);
    });

    it('has the description', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit, description: 'test desc' });
      assert.equal(result.description, 'test desc');
    });

    it('has the explode', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit, explode: true });
      assert.equal(result.explode, true);
    });

    it('has the required', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit, required: true });
      assert.equal(result.required, true);
    });

    it('has the style', async () => {
      const result = await store.addRequestHeader(id, { ...defaultInit, style: 'test' });
      assert.equal(result.style, 'test');
    });
  });

  describe('removeRequestHeader()', () => {
    let requestId = /** @type string */ (null);
    let headerId = /** @type string */ (null);

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      const request = await store.addRequest(op.id);
      requestId = request.id;
      const header = await store.addRequestHeader(requestId, { name: 'x-header' });
      headerId = header.id;
    });

    it('returns updated request', async () => {
      const result = await store.removeRequestHeader(requestId, headerId);
      assert.include(result.types, ns.aml.vocabularies.apiContract.Request, 'is a request');
      assert.deepEqual(result.headers, [], 'headers list is empty');
    });

    it('removes the header from the event', async () => {
      await StoreEvents.Request.removeHeader(window, headerId, requestId);
      let err;
      try {
        await StoreEvents.Parameter.get(window, headerId);
      } catch (e) {
        err = e.message;
      }
      assert.equal(err, `No Parameter for ${headerId}`);
    });

    it('dispatches the deleted event', async () => {
      const p = StoreEvents.Request.removeHeader(window, headerId, requestId);
      const e = await oneEvent(window, StoreEventTypes.Parameter.State.deleted);
      await p;
      assert.equal(e.detail.graphId, headerId, 'has the graphId');
      assert.equal(e.detail.domainType, ns.aml.vocabularies.apiContract.Parameter, 'has the domainType');
      assert.equal(e.detail.domainParent, requestId, 'has the domainParent');
    });
  });

  describe('addRequestQueryParameter()', () => {
    let id = /** @type string */ (null);
    const defaultInit = Object.freeze({ name: 'aQueryParam' });

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      const request = await store.addRequest(op.id);
      id = request.id;
    });

    it('returns an object', async () => {
      const result = await store.addRequestQueryParameter(id, defaultInit);
      assert.typeOf(result, 'object');
    });

    it('stores the Parameter in the store', async () => {
      const param = await store.addRequestQueryParameter(id, defaultInit);
      const result = await store.getParameter(param.id);
      assert.include(result.types, ns.aml.vocabularies.apiContract.Parameter, 'has the Parameter type');
    });

    it('creates the parameter from the event', async () => {
      const result = await StoreEvents.Request.addQueryParameter(window, id, defaultInit);
      assert.typeOf(result, 'object');
    });

    it('dispatches parameter created event', async () => {
      const p = StoreEvents.Request.addQueryParameter(window, id, defaultInit);
      const e = await oneEvent(window, StoreEventTypes.Parameter.State.created);
      const created = await p;
      assert.equal(e.detail.graphId, created.id, 'has the graphId');
      assert.equal(e.detail.domainType, ns.aml.vocabularies.apiContract.Parameter, 'has the domainType');
      assert.equal(e.detail.domainParent, id, 'has the domainParent');
      assert.deepEqual(e.detail.item, created, 'has the item');
    });

    it('has the Parameter type', async () => {
      const result = await store.addRequestQueryParameter(id, defaultInit);
      assert.typeOf(result.types, 'array', 'has the types');
      assert.include(result.types, ns.aml.vocabularies.apiContract.Parameter, 'has the Parameter type');
    });

    it('has the id', async () => {
      const result = await store.addRequestQueryParameter(id, defaultInit);
      assert.typeOf(result.id, 'string');
    });

    it('has the name', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit });
      assert.equal(result.name, 'aQueryParam');
    });

    it('has the allowEmptyValue', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit, allowEmptyValue: true });
      assert.equal(result.allowEmptyValue, true);
    });

    it('has the allowReserved', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit, allowReserved: true });
      assert.equal(result.allowReserved, true);
    });

    it('has the binding', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit });
      assert.equal(result.binding, 'query');
    });

    it('overrides the binding', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit, binding: 'other' });
      assert.equal(result.binding, 'other');
    });

    it('has no schema by default', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit });
      assert.isUndefined(result.schema);
    });

    it('creates the schema', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit, dataType: 'boolean' });
      assert.typeOf(result.schema, 'string', 'has the schema');
      const schema = await store.getType(result.schema);
      assert.include(schema.types, ns.aml.vocabularies.shapes.ScalarShape, 'is a scalar');
      // @ts-ignore
      assert.equal(schema.dataType, ns.w3.xmlSchema.boolean, 'has the data type');
    });

    it('has the deprecated', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit, deprecated: true });
      assert.equal(result.deprecated, true);
    });

    it('has the description', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit, description: 'test desc' });
      assert.equal(result.description, 'test desc');
    });

    it('has the explode', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit, explode: true });
      assert.equal(result.explode, true);
    });

    it('has the required', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit, required: true });
      assert.equal(result.required, true);
    });

    it('has the style', async () => {
      const result = await store.addRequestQueryParameter(id, { ...defaultInit, style: 'test' });
      assert.equal(result.style, 'test');
    });
  });

  describe('removeRequestQueryParameter()', () => {
    let requestId = /** @type string */ (null);
    let paramId = /** @type string */ (null);

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      const request = await store.addRequest(op.id);
      requestId = request.id;
      const param = await store.addRequestQueryParameter(requestId, { name: 'x-header' });
      paramId = param.id;
    });

    it('returns updated request', async () => {
      const result = await store.removeRequestQueryParameter(requestId, paramId);
      assert.include(result.types, ns.aml.vocabularies.apiContract.Request, 'is a request');
      assert.deepEqual(result.headers, [], 'headers list is empty');
    });

    it('removes the parameter from the event', async () => {
      await StoreEvents.Request.removeQueryParameter(window, paramId, requestId);
      let err;
      try {
        await StoreEvents.Parameter.get(window, paramId);
      } catch (e) {
        err = e.message;
      }
      assert.equal(err, `No Parameter for ${paramId}`);
    });

    it('dispatches the deleted event', async () => {
      const p = StoreEvents.Request.removeQueryParameter(window, paramId, requestId);
      const e = await oneEvent(window, StoreEventTypes.Parameter.State.deleted);
      await p;
      assert.equal(e.detail.graphId, paramId, 'has the graphId');
      assert.equal(e.detail.domainType, ns.aml.vocabularies.apiContract.Parameter, 'has the domainType');
      assert.equal(e.detail.domainParent, requestId, 'has the domainParent');
    });
  });

  describe('addRequestCookieParameter()', () => {
    let id = /** @type string */ (null);
    const defaultInit = Object.freeze({ name: 'aCookieParam' });

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      const request = await store.addRequest(op.id);
      id = request.id;
    });

    it('returns an object', async () => {
      const result = await store.addRequestCookieParameter(id, defaultInit);
      assert.typeOf(result, 'object');
    });

    it('stores the Parameter in the store', async () => {
      const param = await store.addRequestCookieParameter(id, defaultInit);
      const result = await store.getParameter(param.id);
      assert.include(result.types, ns.aml.vocabularies.apiContract.Parameter, 'has the Parameter type');
    });

    it('creates the parameter from the event', async () => {
      const result = await StoreEvents.Request.addCookieParameter(window, id, defaultInit);
      assert.typeOf(result, 'object');
    });

    it('dispatches parameter created event', async () => {
      const p = StoreEvents.Request.addCookieParameter(window, id, defaultInit);
      const e = await oneEvent(window, StoreEventTypes.Parameter.State.created);
      const created = await p;
      assert.equal(e.detail.graphId, created.id, 'has the graphId');
      assert.equal(e.detail.domainType, ns.aml.vocabularies.apiContract.Parameter, 'has the domainType');
      assert.equal(e.detail.domainParent, id, 'has the domainParent');
      assert.deepEqual(e.detail.item, created, 'has the item');
    });

    it('has the Parameter type', async () => {
      const result = await store.addRequestCookieParameter(id, defaultInit);
      assert.typeOf(result.types, 'array', 'has the types');
      assert.include(result.types, ns.aml.vocabularies.apiContract.Parameter, 'has the Parameter type');
    });

    it('has the id', async () => {
      const result = await store.addRequestCookieParameter(id, defaultInit);
      assert.typeOf(result.id, 'string');
    });

    it('has the name', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit });
      assert.equal(result.name, 'aCookieParam');
    });

    it('has the allowEmptyValue', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit, allowEmptyValue: true });
      assert.equal(result.allowEmptyValue, true);
    });

    it('has the allowReserved', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit, allowReserved: true });
      assert.equal(result.allowReserved, true);
    });

    it('has the binding', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit });
      assert.equal(result.binding, 'cookie');
    });

    it('overrides the binding', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit, binding: 'other' });
      assert.equal(result.binding, 'other');
    });

    it('has no schema by default', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit });
      assert.isUndefined(result.schema);
    });

    it('creates the schema', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit, dataType: 'boolean' });
      assert.typeOf(result.schema, 'string', 'has the schema');
      const schema = await store.getType(result.schema);
      assert.include(schema.types, ns.aml.vocabularies.shapes.ScalarShape, 'is a scalar');
      // @ts-ignore
      assert.equal(schema.dataType, ns.w3.xmlSchema.boolean, 'has the data type');
    });

    it('has the deprecated', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit, deprecated: true });
      assert.equal(result.deprecated, true);
    });

    it('has the description', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit, description: 'test desc' });
      assert.equal(result.description, 'test desc');
    });

    it('has the explode', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit, explode: true });
      assert.equal(result.explode, true);
    });

    it('has the required', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit, required: true });
      assert.equal(result.required, true);
    });

    it('has the style', async () => {
      const result = await store.addRequestCookieParameter(id, { ...defaultInit, style: 'test' });
      assert.equal(result.style, 'test');
    });
  });

  describe('removeRequestCookieParameter()', () => {
    let requestId = /** @type string */ (null);
    let paramId = /** @type string */ (null);

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      const request = await store.addRequest(op.id);
      requestId = request.id;
      const param = await store.addRequestCookieParameter(requestId, { name: 'x-header' });
      paramId = param.id;
    });

    it('returns updated request', async () => {
      const result = await store.removeRequestCookieParameter(requestId, paramId);
      assert.include(result.types, ns.aml.vocabularies.apiContract.Request, 'is a request');
      assert.deepEqual(result.headers, [], 'headers list is empty');
    });

    it('removes the parameter from the event', async () => {
      await StoreEvents.Request.removeCookieParameter(window, paramId, requestId);
      let err;
      try {
        await StoreEvents.Parameter.get(window, paramId);
      } catch (e) {
        err = e.message;
      }
      assert.equal(err, `No Parameter for ${paramId}`);
    });

    it('dispatches the deleted event', async () => {
      const p = StoreEvents.Request.removeCookieParameter(window, paramId, requestId);
      const e = await oneEvent(window, StoreEventTypes.Parameter.State.deleted);
      await p;
      assert.equal(e.detail.graphId, paramId, 'has the graphId');
      assert.equal(e.detail.domainType, ns.aml.vocabularies.apiContract.Parameter, 'has the domainType');
      assert.equal(e.detail.domainParent, requestId, 'has the domainParent');
    });
  });

  describe('addRequestPayload()', () => {
    let id = /** @type string */ (null);
    const defaultInit = Object.freeze({ mediaType: 'application/json' });

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      const request = await store.addRequest(op.id);
      id = request.id;
    });

    it('returns an object', async () => {
      const result = await store.addRequestPayload(id, defaultInit);
      assert.typeOf(result, 'object');
    });

    it('stores the Payload in the store', async () => {
      const param = await store.addRequestPayload(id, defaultInit);
      const result = await store.getPayload(param.id);
      assert.include(result.types, ns.aml.vocabularies.apiContract.Payload, 'has the Parameter type');
    });

    it('creates the Payload from the event', async () => {
      const result = await StoreEvents.Request.addPayload(window, id, defaultInit);
      assert.typeOf(result, 'object');
    });

    it('dispatches Payload created event', async () => {
      const p = StoreEvents.Request.addPayload(window, id, defaultInit);
      const e = await oneEvent(window, StoreEventTypes.Payload.State.created);
      const created = await p;
      assert.equal(e.detail.graphId, created.id, 'has the graphId');
      assert.equal(e.detail.domainType, ns.aml.vocabularies.apiContract.Payload, 'has the domainType');
      assert.equal(e.detail.domainParent, id, 'has the domainParent');
      assert.deepEqual(e.detail.item, created, 'has the item');
    });

    it('has the Payload type', async () => {
      const result = await store.addRequestPayload(id, defaultInit);
      assert.typeOf(result.types, 'array', 'has the types');
      assert.include(result.types, ns.aml.vocabularies.apiContract.Payload, 'has the Parameter type');
    });

    it('has the id', async () => {
      const result = await store.addRequestPayload(id, defaultInit);
      assert.typeOf(result.id, 'string');
    });

    it('has the name', async () => {
      const result = await store.addRequestPayload(id, { ...defaultInit, name: 'a payload', });
      assert.equal(result.name, 'a payload');
    });

    it('has the mediaType', async () => {
      const result = await store.addRequestPayload(id, { ...defaultInit, });
      assert.equal(result.mediaType, 'application/json');
    });

    it('has default examples', async () => {
      const result = await store.addRequestPayload(id, { ...defaultInit });
      assert.deepEqual(result.examples, []);
    });

    it('has default encoding', async () => {
      const result = await store.addRequestPayload(id, { ...defaultInit });
      assert.deepEqual(result.encoding, []);
    });
  });

  describe('removeRequestPayload()', () => {
    let requestId = /** @type string */ (null);
    let payloadId = /** @type string */ (null);

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      const request = await store.addRequest(op.id);
      requestId = request.id;
      const payload = await store.addRequestPayload(requestId, { mediaType: 'application/json' });
      payloadId = payload.id;
    });

    it('removes the Payload from the store', async () => {
      await store.removeRequestPayload(requestId, payloadId);
      let err;
      try {
        await StoreEvents.Payload.get(window, payloadId);
      } catch (e) {
        err = e.message;
      }
      assert.equal(err, `No Payload for ${payloadId}`);
    });

    it('removes the Payload from the event', async () => {
      await StoreEvents.Request.removePayload(window, payloadId, requestId);
      let err;
      try {
        await StoreEvents.Payload.get(window, payloadId);
      } catch (e) {
        err = e.message;
      }
      assert.equal(err, `No Payload for ${payloadId}`);
    });

    it('dispatches the deleted event', async () => {
      const p = StoreEvents.Request.removePayload(window, payloadId, requestId);
      const e = await oneEvent(window, StoreEventTypes.Payload.State.deleted);
      await p;
      assert.equal(e.detail.graphId, payloadId, 'has the graphId');
      assert.equal(e.detail.domainType, ns.aml.vocabularies.apiContract.Payload, 'has the domainType');
      assert.equal(e.detail.domainParent, requestId, 'has the domainParent');
    });
  });

  describe('deleteRequest()', () => {
    let operationId = /** @type string */ (null);
    let requestId = /** @type string */ (null);

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      operationId = op.id;
      const request = await store.addRequest(operationId);
      requestId = request.id;
    });

    it('removes the Request from the store', async () => {
      await store.deleteRequest(requestId, operationId);
      let err;
      try {
        await StoreEvents.Request.get(window, requestId);
      } catch (e) {
        err = e.message;
      }
      assert.equal(err, `No Request for ${requestId}`);
    });

    it('removes the Request from the event', async () => {
      await StoreEvents.Operation.removeRequest(window, requestId, operationId);
      let err;
      try {
        await StoreEvents.Request.get(window, requestId);
      } catch (e) {
        err = e.message;
      }
      assert.equal(err, `No Request for ${requestId}`);
    });

    it('dispatches the deleted event', async () => {
      const p = StoreEvents.Operation.removeRequest(window, requestId, operationId);
      const e = await oneEvent(window, StoreEventTypes.Request.State.deleted);
      await p;
      assert.equal(e.detail.graphId, requestId, 'has the graphId');
      assert.equal(e.detail.domainType, ns.aml.vocabularies.apiContract.Request, 'has the domainType');
      assert.equal(e.detail.domainParent, operationId, 'has the domainParent');
    });
  });

  describe('updateRequestProperty()', () => {
    let operationId = /** @type string */ (null);
    let requestId = /** @type string */ (null);

    beforeEach(async () => {
      await store.createWebApi();
      const ep = await store.addEndpoint({ path: '/test' });
      const op = await store.addOperation(ep.id, { 
        method: 'get',
      });
      operationId = op.id;
      const request = await store.addRequest(operationId);
      requestId = request.id;
    });

    it('updates the description', async () => {
      const result = await store.updateRequestProperty(requestId, 'description', 'updated desc');
      assert.equal(result.description, 'updated desc', 'returns updated value');
      const stored = await store.getRequest(requestId);
      assert.equal(stored.description, 'updated desc', 'stores the value');
    });

    it('updates the required', async () => {
      const result = await store.updateRequestProperty(requestId, 'required', true);
      assert.equal(result.required, true, 'returns updated value');
      const stored = await store.getRequest(requestId);
      assert.equal(stored.required, true, 'stores the value');
    });

    it('updates property from the event', async () => {
      await StoreEvents.Request.update(window, requestId, 'description', 'updated desc');
      const stored = await store.getRequest(requestId);
      assert.equal(stored.description, 'updated desc', 'stores the value');
    });

    it('dispatches the updated event', async () => {
      StoreEvents.Request.update(window, requestId, 'description', 'updated desc');
      const e = await oneEvent(window, StoreEventTypes.Request.State.updated);
      assert.equal(e.detail.graphId, requestId, 'has the graphId');
      assert.equal(e.detail.domainType, ns.aml.vocabularies.apiContract.Request, 'has the domainType');
      assert.equal(e.detail.property, 'description', 'has the property');
      assert.typeOf(e.detail.item, 'object', 'has the item');
    });
  });
});
