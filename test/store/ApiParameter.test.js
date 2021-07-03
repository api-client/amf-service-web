import { assert, oneEvent } from '@open-wc/testing';
import { AmfStoreService, StoreEvents, StoreEventTypes, ns } from '../../worker.index.js';

describe('AmfStoreService', () => {
  let store = /** @type AmfStoreService */ (null);
  before(async () => {
    store = new AmfStoreService();
    await store.init();
  });

  after(() => {
    store.worker.terminate();
  });

  describe('Api Parameters', () => {
    describe('getParameter()', () => {
      let id = /** @type string */ (null);

      beforeEach(async () => {
        await store.createWebApi();
        const ep = await store.addEndpoint({ path: '/test' });
        const op = await store.addOperation(ep.id, { method: 'get' });
        const request = await store.addRequest(op.id, { queryParameters: ['test'] });
        [id] = request.queryParameters;
      });

      it('reads a parameter from the store', async () => {
        const param = await store.getParameter(id);
        assert.typeOf(param, 'object', 'is the object');
        const [type] = param.types;
        assert.equal(type, ns.aml.vocabularies.apiContract.Parameter);
      });

      it('reads the parameter via the event', async () => {
        const param = await StoreEvents.Parameter.get(window, id);
        assert.typeOf(param, 'object', 'is the object');
        const [type] = param.types;
        assert.equal(type, ns.aml.vocabularies.apiContract.Parameter);
      });
    });

    describe('getParameterRecursive()', () => {
      let id = /** @type string */ (null);

      beforeEach(async () => {
        await store.createWebApi();
        const ep = await store.addEndpoint({ path: '/test' });
        const op = await store.addOperation(ep.id, { method: 'get' });
        const request = await store.addRequest(op.id, { queryParameters: ['test'] });
        [id] = request.queryParameters;
        await store.addParameterExample(id, {
          name: 'an example',
          value: 'test example',
        });
      });

      it('reads a parameter from the store', async () => {
        const param = await store.getParameterRecursive(id);
        assert.typeOf(param, 'object', 'is the object');
        const [example] = param.examples;
        assert.typeOf(example, 'object', 'example is an object');
        assert.equal(example.value, 'test example', 'has example properties');
      });

      it('reads a parameter via the event', async () => {
        const param = await StoreEvents.Parameter.getRecursive(window, id);
        assert.typeOf(param, 'object', 'is the object');
        const [example] = param.examples;
        assert.typeOf(example, 'object', 'example is an object');
        assert.equal(example.value, 'test example', 'has example properties');
      });
    });

    describe('getParameters()', () => {
      let ids = /** @type string[] */ (null);

      beforeEach(async () => {
        await store.createWebApi();
        const ep = await store.addEndpoint({ path: '/test' });
        const op = await store.addOperation(ep.id, { method: 'get' });
        const request = await store.addRequest(op.id, { queryParameters: ['t1', 't2', 't3'] });
        ids = request.queryParameters;
      });

      it('reads all parameters from the store', async () => {
        const result = await store.getParameters(ids);
        assert.typeOf(result, 'array', 'result is an array');
        assert.lengthOf(result, 3, 'has all results');
        const [type] = result[0].types;
        assert.equal(type, ns.aml.vocabularies.apiContract.Parameter, 'has parameters');
      });

      it('inserts undefined when no parameter', async () => {
        const result = await store.getParameters([ids[0], 'tUnknown', ids[2]]);
        assert.typeOf(result, 'array', 'result is an array');
        assert.lengthOf(result, 3, 'has all results');
        assert.ok(result[0], 'has first result');
        assert.isUndefined(result[1], 'has no missing result');
        assert.ok(result[2], 'has third result');
      });

      it('can query bulk with the event', async () => {
        const result = await StoreEvents.Parameter.getBulk(window, ids);
        assert.typeOf(result, 'array', 'result is an array');
        assert.lengthOf(result, 3, 'has all results');
      });
    });

    describe('getParametersRecursive()', () => {
      let ids = /** @type string[] */ (null);

      beforeEach(async () => {
        await store.createWebApi();
        const ep = await store.addEndpoint({ path: '/test' });
        const op = await store.addOperation(ep.id, { method: 'get' });
        const request = await store.addRequest(op.id, { queryParameters: ['t1', 't2', 't3'] });
        ids = request.queryParameters;
        await store.addParameterExample(ids[0], {
          name: 'an example',
          value: 'test example',
        });
      });

      it('reads all parameters from the store recursive', async () => {
        const result = await store.getParametersRecursive(ids);
        assert.typeOf(result, 'array', 'result is an array');
        assert.lengthOf(result, 3, 'has all results');
        const [example] = result[0].examples;
        assert.typeOf(example, 'object', 'example is an object');
        assert.equal(example.value, 'test example', 'has example properties');
      });

      it('inserts undefined when no parameter', async () => {
        const result = await store.getParametersRecursive([ids[0], 'tUnknown', ids[2]]);
        assert.typeOf(result, 'array', 'result is an array');
        assert.lengthOf(result, 3, 'has all results');
        assert.ok(result[0], 'has first result');
        assert.isUndefined(result[1], 'has no missing result');
        assert.ok(result[2], 'has third result');
      });

      it('can query bulk with the event', async () => {
        const result = await StoreEvents.Parameter.getBulkRecursive(window, ids);
        assert.typeOf(result, 'array', 'result is an array');
        assert.lengthOf(result, 3, 'has all results');
        const [example] = result[0].examples;
        assert.typeOf(example, 'object', 'example is an object');
        assert.equal(example.value, 'test example', 'has example properties');
      });
    });

    describe('updateParameterProperty()', () => {
      let id = /** @type string */ (null);

      beforeEach(async () => {
        await store.createWebApi();
        const ep = await store.addEndpoint({ path: '/test' });
        const op = await store.addOperation(ep.id, { method: 'get' });
        const request = await store.addRequest(op.id, { queryParameters: ['test'] });
        [id] = request.queryParameters;
      });

      it('updates the name', async () => {
        const value = 'updated name';
        const result = await store.updateParameterProperty(id, 'name', value);
        assert.equal(result.name, value, 'returns updated value');
        const param = await store.getParameter(id);
        assert.equal(param.name, value, 'updates the value in the store');
      });

      it('updates the description', async () => {
        const value = 'updated description';
        const result = await store.updateParameterProperty(id, 'description', value);
        assert.equal(result.description, value, 'returns updated value');
        const param = await store.getParameter(id);
        assert.equal(param.description, value, 'updates the value in the store');
      });

      it('updates the style', async () => {
        const value = 'updated style';
        const result = await store.updateParameterProperty(id, 'style', value);
        assert.equal(result.style, value, 'returns updated value');
        const param = await store.getParameter(id);
        assert.equal(param.style, value, 'updates the value in the store');
      });

      it('updates the binding', async () => {
        const value = 'updated binding';
        const result = await store.updateParameterProperty(id, 'binding', value);
        assert.equal(result.binding, value, 'returns updated value');
        const param = await store.getParameter(id);
        assert.equal(param.binding, value, 'updates the value in the store');
      });

      it('updates the required', async () => {
        const result = await store.updateParameterProperty(id, 'required', true);
        assert.isTrue(result.required, 'returns updated value');
        const param = await store.getParameter(id);
        assert.isTrue(param.required, 'updates the value in the store');
      });

      it('updates the deprecated', async () => {
        const result = await store.updateParameterProperty(id, 'deprecated', true);
        assert.isTrue(result.deprecated, 'returns updated value');
        const param = await store.getParameter(id);
        assert.isTrue(param.deprecated, 'updates the value in the store');
      });

      it('updates the allowEmptyValue', async () => {
        const result = await store.updateParameterProperty(id, 'allowEmptyValue', true);
        assert.isTrue(result.allowEmptyValue, 'returns updated value');
        const param = await store.getParameter(id);
        assert.isTrue(param.allowEmptyValue, 'updates the value in the store');
      });

      it('updates the explode', async () => {
        const result = await store.updateParameterProperty(id, 'explode', true);
        assert.isTrue(result.explode, 'returns updated value');
        const param = await store.getParameter(id);
        assert.isTrue(param.explode, 'updates the value in the store');
      });

      it('updates the allowReserved', async () => {
        const result = await store.updateParameterProperty(id, 'allowReserved', true);
        assert.isTrue(result.allowReserved, 'returns updated value');
        const param = await store.getParameter(id);
        assert.isTrue(param.allowReserved, 'updates the value in the store');
      });

      it('throws for unknown property', async () => {
        let thrown = false;
        try {
          // @ts-ignore
          await store.updateParameterProperty(id, 'unknown', true);
        } catch (e) {
          thrown = true;
        }
        assert.isTrue(thrown);
      });

      it('updates the property via the event', async () => {
        const value = 'updated name';
        await StoreEvents.Parameter.update(window, id, 'name', value);
        const param = await store.getParameter(id);
        assert.equal(param.name, value, 'updates the value in the store');
      });

      it('dispatches the updated event', async () => {
        StoreEvents.Parameter.update(window, id, 'name', 'test');
        const e = await oneEvent(window, StoreEventTypes.Parameter.State.updated);
        const { detail } = e;
        assert.equal(detail.graphId, id, 'has the graphId');
        assert.equal(detail.domainType, ns.aml.vocabularies.apiContract.Parameter, 'has the graphType');
        assert.equal(detail.property, 'name', 'has the property');
        assert.typeOf(detail.item, 'object', 'has the item');
      });
    });

    describe('addParameterExample()', () => {
      let id = /** @type string */ (null);
      const init = { 
        name: 'example name', 
        description: 'ex desc', 
        displayName: 'ex dn', 
        mediaType: 'application/json', 
        strict: true, 
        value: 'example value',
      };

      beforeEach(async () => {
        await store.createWebApi();
        const ep = await store.addEndpoint({ path: '/test' });
        const op = await store.addOperation(ep.id, { method: 'get' });
        const request = await store.addRequest(op.id, { queryParameters: ['test'] });
        [id] = request.queryParameters;
      });

      it('returns the example object', async () => {
        const result = await store.addParameterExample(id, { ...init });
        assert.typeOf(result, 'object', 'returns an object');
        const [type] = result.types;
        assert.equal(type, ns.aml.vocabularies.apiContract.Example);
      });

      it('adds the example on the parent object', async () => {
        const result = await store.addParameterExample(id, { ...init });
        const param = await store.getParameter(id);
        assert.deepEqual(param.examples, [result.id], 'the example is part of the parameter');
      });

      it('adds the name', async () => {
        const result = await store.addParameterExample(id, { ...init });
        assert.equal(result.name, init.name);
      });

      it('adds the description', async () => {
        const result = await store.addParameterExample(id, { ...init });
        assert.equal(result.description, init.description);
      });

      it('adds the displayName', async () => {
        const result = await store.addParameterExample(id, { ...init });
        assert.equal(result.displayName, init.displayName);
      });

      it('adds the mediaType', async () => {
        const result = await store.addParameterExample(id, { ...init });
        assert.equal(result.mediaType, init.mediaType);
      });

      it('adds the value', async () => {
        const result = await store.addParameterExample(id, { ...init });
        assert.equal(result.value, init.value);
      });

      it('adds the strict', async () => {
        const result = await store.addParameterExample(id, { ...init });
        assert.equal(result.strict, init.strict);
      });

      it('adds the example via the event', async () => {
        const result = await StoreEvents.Parameter.addExample(window, id, { ...init });
        const param = await store.getParameter(id);
        assert.deepEqual(param.examples, [result.id], 'the example is part of the parameter');
      });

      it('dispatches the created event', async () => {
        StoreEvents.Parameter.addExample(window, id, { ...init });
        const e = await oneEvent(window, StoreEventTypes.Example.State.created);
        const record = e.detail;
        assert.typeOf(record.graphId, 'string', 'has the created id');
        assert.equal(record.domainType, ns.aml.vocabularies.apiContract.Example, 'has the domainType');
        assert.equal(record.domainParent, id, 'has the domainParent');
        assert.typeOf(record.item, 'object', 'has the created item');
      });
    });

    describe('removeParameterExample()', () => {
      let parameterId = /** @type string */ (null);
      let exampleId = /** @type string */ (null);

      beforeEach(async () => {
        await store.createWebApi();
        const ep = await store.addEndpoint({ path: '/test' });
        const op = await store.addOperation(ep.id, { method: 'get' });
        const request = await store.addRequest(op.id, { queryParameters: ['test'] });
        [parameterId] = request.queryParameters;
        const example = await store.addParameterExample(parameterId, { name: 'test' });
        exampleId = example.id;
      });

      it('removes the example from the graph', async () => {
        await store.removeParameterExample(parameterId, exampleId);
        let thrown = false;
        try {
          await store.getExample(exampleId);
        } catch (e) {
          thrown = true;
        }
        assert.isTrue(thrown, 'Throws the error');
      });
  
      it('removes the example from the parameter', async () => {
        await store.removeParameterExample(parameterId, exampleId);
        const param = await store.getParameter(parameterId);
        assert.deepEqual(param.examples, []);
      });
  
      it('deletes the example via the event', async () => {
        await StoreEvents.Parameter.removeExample(window, exampleId, parameterId);
        const param = await store.getParameter(parameterId);
        assert.deepEqual(param.examples, []);
      });
  
      it('dispatches the delete event', async () => {
        store.removeParameterExample(parameterId, exampleId);
        const e = await oneEvent(window, StoreEventTypes.Example.State.deleted);
        const record = e.detail;
        assert.equal(record.graphId, exampleId, 'has the id');
        assert.equal(record.domainType, ns.aml.vocabularies.apiContract.Example, 'has the domainType');
        assert.equal(record.domainParent, parameterId, 'has the domainParent');
      });
    });
  });
});
