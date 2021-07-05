import { assert, oneEvent } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, StoreEvents, StoreEventTypes, ns } from '../../worker.index.js';

/** @typedef {import('../../').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('../../').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */

describe('AmfStoreService', () => {
  let store = /** @type AmfStoreService */ (null);
  before(async () => {
    store = new AmfStoreService();
    await store.init();
  });

  after(() => {
    store.worker.terminate();
  });

  describe('listDocumentations()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi, 'RAML 1.0');
    });

    it('reads list of types', async () => {
      const result  = await store.listDocumentations();
      assert.typeOf(result, 'array', 'has the result');
      assert.lengthOf(result, 1, 'has all types definitions');
    });

    it('has the documentation definition', async () => {
      const result  = await store.listDocumentations();
      const [doc] = result;
      assert.typeOf(doc.id, 'string', 'has the id');
      assert.typeOf(doc.description, 'string', 'has the description');
      assert.typeOf(doc.title, 'string', 'has the title');
    });

    it('list types with the event', async () => {
      const result = await StoreEvents.Documentation.list(document.body);
      assert.typeOf(result, 'array');
    });
  });

  describe('addDocumentation()', () => {
    beforeEach(async () => {
      await store.createWebApi();
    });

    it('returns created documentation', async () => {
      const result = await store.addDocumentation({ title: 'test-docs' });
      assert.typeOf(result, 'object', 'has the created object');
    });

    it('has the id', async () => {
      const result = await store.addDocumentation({ title: 'test docs' });
      assert.typeOf(result.id, 'string');
    });

    it('has the description', async () => {
      const description = 'test description';
      const result = await store.addDocumentation({ title: 'test docs', description });
      assert.equal(result.description, description);
    });

    it('has the url', async () => {
      const title = 'A documentation';
      const url = 'https://test';
      const result = await store.addDocumentation({ title, url });
      assert.equal(result.url, url, 'has the URL');
      assert.equal(result.title, title, 'has the title');
    });

    it('has the types', async () => {
      const title = 'A documentation';
      const result = await store.addDocumentation({ title });
      assert.typeOf(result.types, 'array');
    });

    it('dispatches the create event', async () => {
      const title = 'A documentation';
      store.addDocumentation({ title });
      const e = await oneEvent(window, StoreEventTypes.Documentation.State.created);
      const { detail } = e;
      assert.typeOf(detail.graphId, 'string', 'has the graphId');
      assert.typeOf(detail.domainType, 'string', 'has the domainType');
      assert.typeOf(detail.item, 'object', 'has the item');
    });

    it('creates documentation from the event', async () => {
      const title = 'A documentation';
      const url = 'https://test';
      const result = await StoreEvents.Documentation.add(window, { title, url });
      assert.equal(result.url, url, 'has the URL');
      assert.equal(result.title, title, 'has the title');
    });
  });

  describe('getDocumentation()', () => {
    const title = 'A documentation';
    const url = 'https://test';
    const description = 'test description';
    let id;

    beforeEach(async () => {
      await store.createWebApi();
      const doc = await store.addDocumentation({ title, url, description });
      id = doc.id;
    });

    it('returns an object', async () => {
      const result = await store.getDocumentation(id);
      assert.typeOf(result, 'object');
    });

    it('has the id', async () => {
      const result = await store.getDocumentation(id);
      assert.equal(result.id, id);
    });

    it('has the title', async () => {
      const result = await store.getDocumentation(id);
      assert.equal(result.title, title);
    });

    it('has the url', async () => {
      const result = await store.getDocumentation(id);
      assert.equal(result.url, url);
    });

    it('has the description', async () => {
      const result = await store.getDocumentation(id);
      assert.equal(result.description, description);
    });

    it('has the types', async () => {
      const result = await store.getDocumentation(id);
      assert.typeOf(result.types, 'array');
    });

    it('reads the object from the event', async () => {
      const result = await StoreEvents.Documentation.get(window, id);
      assert.equal(result.id, id);
    });
  });

  describe('updateDocumentationProperty()', () => {
    const title = 'A documentation';
    const url = 'https://test';
    const description = 'test description';
    let id;

    beforeEach(async () => {
      await store.createWebApi();
      const doc = await store.addDocumentation({ title, url, description });
      id = doc.id;
    });

    it('updates the title', async () => {
      const result = await store.updateDocumentationProperty(id, 'title', 'updated title');
      assert.equal(result.title, 'updated title');
    });

    it('updates the description', async () => {
      const result = await store.updateDocumentationProperty(id, 'description', 'updated description');
      assert.equal(result.description, 'updated description');
    });

    it('updates the url', async () => {
      const result = await store.updateDocumentationProperty(id, 'url', 'https://updated');
      assert.equal(result.url, 'https://updated');
    });

    it('updates the value from the event', async () => {
      await StoreEvents.Documentation.update(window, id, 'url', 'https://updated');
      const result = await store.getDocumentation(id);
      assert.equal(result.url, 'https://updated');
    });

    it('dispatches the change event', async () => {
      store.updateDocumentationProperty(id, 'url', 'https://updated');
      const e = await oneEvent(window, StoreEventTypes.Documentation.State.updated);
      const { detail } = e;
      assert.equal(detail.graphId, id, 'has the graphId');
      assert.equal(detail.domainType, ns.aml.vocabularies.core.CreativeWork, 'has the graphType');
      assert.equal(detail.property, 'url', 'has the property');
      assert.typeOf(detail.item, 'object', 'has the item');
    });
  });

  describe('deleteDocumentation()', () => {
    const title = 'A documentation';
    const url = 'https://test';
    const description = 'test description';
    let id;

    beforeEach(async () => {
      await store.createWebApi();
      const doc = await store.addDocumentation({ title, url, description });
      id = doc.id;
    });

    it('removes the object from the store', async () => {
      await store.deleteDocumentation(id);
      const doc = await store.getDocumentation(id);
      assert.isUndefined(doc);
    });

    it('removes the object from the store with the event', async () => {
      await StoreEvents.Documentation.delete(window, id);
      const doc = await store.getDocumentation(id);
      assert.isUndefined(doc);
    });

    it('dispatches the delete event', async () => {
      store.deleteDocumentation(id);
      const e = await oneEvent(window, StoreEventTypes.Documentation.State.deleted);
      const { detail } = e;
      assert.equal(detail.graphId, id, 'has the graphId');
      assert.equal(detail.domainType, ns.aml.vocabularies.core.CreativeWork, 'has the graphType');
    });
  });
});
