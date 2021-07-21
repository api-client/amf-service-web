import { assert, oneEvent } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
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

  describe('listCustomDomainProperties()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi, 'RAML 1.0');
    });

    it('reads list of properties', async () => {
      const result  = await store.listCustomDomainProperties();
      assert.typeOf(result, 'array', 'has the result');
      assert.lengthOf(result, 4, 'has all definitions');
    });

    it('has the property definition', async () => {
      const result  = await store.listCustomDomainProperties();
      const [property] = result;
      assert.typeOf(property.id, 'string', 'has the id');
      assert.equal(property.name, 'deprecated', 'has the name');
    });

    it('list properties with the event', async () => {
      const result = await StoreEvents.CustomProperty.list(document.body);
      assert.typeOf(result, 'array');
    });
  });

  describe('addCustomDomainProperty()', () => {
    beforeEach(async () => {
      await store.createWebApi();
    });

    it('adds default property', async () => {
      const result = await store.addCustomDomainProperty();
      assert.typeOf(result, 'object', 'is an object');
      assert.typeOf(result.id, 'string', 'has the id');
      assert.equal(result.types[0], ns.aml.vocabularies.document.DomainProperty, 'has the type');
    });

    it('adds the name property', async () => {
      const result = await store.addCustomDomainProperty({
        name: 'test name'
      });
      assert.equal(result.name, 'test name');
    });

    it('adds the displayName property', async () => {
      const result = await store.addCustomDomainProperty({
        displayName: 'test name'
      });
      assert.equal(result.displayName, 'test name');
    });

    it('dispatches the created event', async () => {
      store.addCustomDomainProperty({ name: 'test' });
      const e = await oneEvent(window, StoreEventTypes.CustomProperty.State.created);
      const { detail } = e;
      assert.typeOf(detail.graphId, 'string', 'has the graphId');
      assert.typeOf(detail.domainType, 'string', 'has the domainType');
      assert.typeOf(detail.item, 'object', 'has the item');
    });

    it('adds the property via the event', async () => {
      const result = await StoreEvents.CustomProperty.add(window, {
        name: 'test name'
      });
      assert.equal(result.name, 'test name');
    });
  });

  describe('getCustomDomainProperty()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi, 'RAML 1.0');
    });

    it('reads a property', async () => {
      const list  = await store.listCustomDomainProperties();
      const result = await store.getCustomDomainProperty(list[3].id);
      assert.equal(result.name, 'unusedInTheApi', 'has the name');
      assert.typeOf(result.schema, 'object', 'has the schema');
      assert.typeOf(result.schema.id, 'string', 'schema is an object');
      assert.include(result.types, ns.aml.vocabularies.document.DomainProperty, 'has the types');
    });

    it('throws when unknown type', async () => {
      let msg = '';
      try {
        await store.getCustomDomainProperty('none');
      } catch (e) {
        msg = e.message;
      }
      assert.equal(msg, 'No CustomDomainProperty for none');
    });

    it('reads via the event', async () => {
      const list  = await store.listCustomDomainProperties();
      const result = await StoreEvents.CustomProperty.get(window, list[3].id);
      assert.equal(result.name, 'unusedInTheApi', 'has the name');
      assert.typeOf(result.schema, 'object', 'has the schema');
      assert.typeOf(result.schema.id, 'string', 'schema is an object');
      assert.include(result.types, ns.aml.vocabularies.document.DomainProperty, 'has the types');
    });
  });

  describe('deleteCustomDomainProperty()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi, 'RAML 1.0');
    });

    it('removes an item from the declares', async () => {
      const listBefore  = await store.listCustomDomainProperties();
      await store.deleteCustomDomainProperty(listBefore[0].id);
      const listAfter  = await store.listCustomDomainProperties();
      assert.notStrictEqual(listBefore.length, listAfter.length);
    });

    it('dispatches the delete event', async () => {
      const list  = await store.listCustomDomainProperties();
      const { id } = list[0];
      store.deleteCustomDomainProperty(id);
      const e = await oneEvent(window, StoreEventTypes.CustomProperty.State.deleted);
      const { detail } = e;
      assert.equal(detail.graphId, id, 'has the graphId');
      assert.equal(detail.domainType, ns.aml.vocabularies.document.DomainProperty, 'has the graphType');
    });

    it('deletes the property via the event', async () => {
      const listBefore  = await store.listCustomDomainProperties();
      await StoreEvents.CustomProperty.delete(window, listBefore[0].id);
      const listAfter  = await store.listCustomDomainProperties();
      assert.notStrictEqual(listBefore.length, listAfter.length);
    });
  });

  describe('updateCustomDomainProperty()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi, 'RAML 1.0');
    });

    it('updates the name', async () => {
      const list  = await store.listCustomDomainProperties();
      const { id } = list[0];
      await store.updateCustomDomainProperty(id, 'name', 'updated name');
      const updated  = await store.getCustomDomainProperty(id);
      assert.equal(updated.name, 'updated name');
    });

    it('updates the displayName', async () => {
      const list  = await store.listCustomDomainProperties();
      const { id } = list[0];
      await store.updateCustomDomainProperty(id, 'displayName', 'updated displayName');
      const updated  = await store.getCustomDomainProperty(id);
      assert.equal(updated.displayName, 'updated displayName');
    });

    it('updates the description', async () => {
      const list  = await store.listCustomDomainProperties();
      const { id } = list[0];
      await store.updateCustomDomainProperty(id, 'description', 'updated description');
      const updated  = await store.getCustomDomainProperty(id);
      assert.equal(updated.description, 'updated description');
    });

    it('updates the property via the event', async () => {
      const list  = await store.listCustomDomainProperties();
      const { id } = list[0];
      await StoreEvents.CustomProperty.update(window, id, 'description', 'updated description');
      const updated  = await store.getCustomDomainProperty(id);
      assert.equal(updated.description, 'updated description');
    });
  });

  describe('getDomainExtension()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi, 'RAML 1.0');
    });

    it('reads the extension data', async () => {
      const op  = await store.getOperation('get', '/test-parameters/{feature}');
      const [prop] = op.customDomainProperties;
      const result = await store.getDomainExtension(prop.id);
      assert.typeOf(result.name, 'string', 'has the name');
      assert.typeOf(result.definedBy, 'object', 'has the definedBy');
      assert.typeOf(result.definedBy.id, 'string', 'definedBy is an object');
      assert.typeOf(result.extension, 'object', 'has the extension');
      assert.typeOf(result.extension.id, 'string', 'extension is an object');
      assert.include(result.types, ns.aml.vocabularies.apiContract.DomainExtension, 'has the types');
    });

    it('reads the extension data via the event', async () => {
      const op  = await store.getOperation('get', '/test-parameters/{feature}');
      const [prop] = op.customDomainProperties;
      const result = await StoreEvents.CustomProperty.getExtension(window, prop.id);
      assert.typeOf(result.name, 'string', 'has the name');
      assert.typeOf(result.definedBy, 'object', 'has the definedBy');
      assert.typeOf(result.definedBy.id, 'string', 'definedBy is an object');
      assert.typeOf(result.extension, 'object', 'has the extension');
      assert.typeOf(result.extension.id, 'string', 'extension is an object');
      assert.include(result.types, ns.aml.vocabularies.apiContract.DomainExtension, 'has the types');
    });
  });
});
