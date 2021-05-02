import { assert, oneEvent } from '@open-wc/testing';
import { ns } from '@api-components/amf-helper-mixin/src/Namespace.js';
import { AmfStoreService, StoreEvents, StoreEventTypes } from '../../worker.index.js';

describe('AmfStoreService', () => {
  let store = /** @type AmfStoreService */ (null);
  before(async () => {
    store = new AmfStoreService();
    await store.init();
  });

  after(() => {
    store.worker.terminate();
  });

  describe('Api Examples', () => {
    describe('getExample()', () => {
      let id = /** @type string */ (null);
      const init = Object.freeze({
        name: 'test', 
        mediaType: 'application/json', 
        description: 'test desc', 
        displayName: 'test dn', 
        strict: true, 
        value: '{"test":true}',
      });

      beforeEach(async () => {
        await store.createWebApi();
        const ep = await store.addEndpoint({ path: '/test' });
        const op = await store.addOperation(ep.id, { method: 'get' });
        const request = await store.addRequest(op.id);
        const payload = await store.addRequestPayload(request.id, { mediaType: 'application/json' });
        const example = await store.addParameterExample(payload.id, { ...init });
        id = example.id;
      });

      it('reads the example from the store', async () => {
        const example = await store.getExample(id);
        assert.typeOf(example, 'object', 'is the object');
        const [type] = example.types;
        assert.equal(type, ns.aml.vocabularies.apiContract.Example);
      });

      it('has the name', async () => {
        const example = await store.getExample(id);
        assert.equal(example.name, init.name);
      });

      it('has the mediaType', async () => {
        const example = await store.getExample(id);
        assert.equal(example.mediaType, init.mediaType);
      });

      it('has the description', async () => {
        const example = await store.getExample(id);
        assert.equal(example.description, init.description);
      });

      it('has the displayName', async () => {
        const example = await store.getExample(id);
        assert.equal(example.displayName, init.displayName);
      });

      it('has the value', async () => {
        const example = await store.getExample(id);
        assert.equal(example.value, init.value);
      });

      it('has the strict', async () => {
        const example = await store.getExample(id);
        assert.isTrue(example.strict);
      });
    });

    describe('updateParameterProperty()', () => {
      let id = /** @type string */ (null);
      const init = Object.freeze({
        name: 'test',
      });

      beforeEach(async () => {
        await store.createWebApi();
        const ep = await store.addEndpoint({ path: '/test' });
        const op = await store.addOperation(ep.id, { method: 'get' });
        const request = await store.addRequest(op.id);
        const payload = await store.addRequestPayload(request.id, { mediaType: 'application/json' });
        const example = await store.addParameterExample(payload.id, { ...init });
        id = example.id;
      });

      it('updates the name', async () => {
        const value = 'updated name';
        const result = await store.updateExampleProperty(id, 'name', value);
        assert.equal(result.name, value, 'returns updated value');
        const param = await store.getExample(id);
        assert.equal(param.name, value, 'updates the value in the store');
      });

      it('updates the displayName', async () => {
        const value = 'updated display name';
        const result = await store.updateExampleProperty(id, 'displayName', value);
        assert.equal(result.displayName, value, 'returns updated value');
        const param = await store.getExample(id);
        assert.equal(param.displayName, value, 'updates the value in the store');
      });

      it('updates the description', async () => {
        const value = 'updated description';
        const result = await store.updateExampleProperty(id, 'description', value);
        assert.equal(result.description, value, 'returns updated value');
        const param = await store.getExample(id);
        assert.equal(param.description, value, 'updates the value in the store');
      });

      it('updates the mediaType', async () => {
        const value = 'updated media type';
        const result = await store.updateExampleProperty(id, 'mediaType', value);
        assert.equal(result.mediaType, value, 'returns updated value');
        const param = await store.getExample(id);
        assert.equal(param.mediaType, value, 'updates the value in the store');
      });

      it('updates the value', async () => {
        const value = 'updated value';
        const result = await store.updateExampleProperty(id, 'value', value);
        assert.equal(result.value, value, 'returns updated value');
        const param = await store.getExample(id);
        assert.equal(param.value, value, 'updates the value in the store');
      });

      it('updates the strict', async () => {
        const result = await store.updateExampleProperty(id, 'strict', true);
        assert.isTrue(result.strict, 'returns updated value');
        const param = await store.getExample(id);
        assert.isTrue(param.strict, 'updates the value in the store');
      });

      it('throws for unknown property', async () => {
        let thrown = false;
        try {
          // @ts-ignore
          await store.updateExampleProperty(id, 'unknown', true);
        } catch (e) {
          thrown = true;
        }
        assert.isTrue(thrown);
      });

      it('updates the property via the event', async () => {
        const value = 'updated name';
        await StoreEvents.Example.update(window, id, 'name', value);
        const param = await store.getExample(id);
        assert.equal(param.name, value, 'updates the value in the store');
      });

      it('dispatches the updated event', async () => {
        StoreEvents.Example.update(window, id, 'name', 'test');
        const e = await oneEvent(window, StoreEventTypes.Example.State.updated);
        const { detail } = e;
        assert.equal(detail.graphId, id, 'has the graphId');
        assert.equal(detail.domainType, ns.aml.vocabularies.apiContract.Example, 'has the graphType');
        assert.equal(detail.property, 'name', 'has the property');
        assert.typeOf(detail.item, 'object', 'has the item');
      });
    });
  });
});
