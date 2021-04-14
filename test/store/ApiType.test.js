import { assert, oneEvent } from '@open-wc/testing';
import { ns } from '@api-components/amf-helper-mixin/src/Namespace.js';
import { AmfLoader } from '../helpers/AmfLoader.js';
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

  describe('listTypes()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi);
    });

    it('reads list of types', async () => {
      const result  = await store.listTypes();
      assert.typeOf(result, 'array', 'has the result');
      assert.lengthOf(result, 12, 'has all types definitions');
    });

    it('has the types definition', async () => {
      const result  = await store.listTypes();
      const [type] = result;
      assert.typeOf(type.id, 'string', 'has the id');
      assert.equal(type.name, 'ErrorResource', 'has the name');
    });

    it('list types with the event', async () => {
      const result = await StoreEvents.Type.list(document.body);
      assert.typeOf(result, 'array');
    });
  });

  describe('addType()', () => {
    beforeEach(async () => {
      await store.createWebApi();
    });

    it('adds default type', async () => {
      const result = await store.addType();
      assert.typeOf(result, 'object', 'is an object');
      assert.typeOf(result.id, 'string', 'has the id');
      assert.typeOf(result.types, 'array', 'has the types array');
      assert.equal(result.types[0], ns.aml.vocabularies.shapes.AnyShape, 'is AnyShape');
      assert.deepEqual(result.values, [], 'has no values');
      assert.deepEqual(result.inherits, [], 'has no inherits');
      assert.deepEqual(result.or, [], 'has no or');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.xone, [], 'has no xone');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.isUndefined(result.name, 'has no name');
      assert.isUndefined(result.displayName, 'has no displayName');
      assert.isUndefined(result.description, 'has no description');
      assert.isUndefined(result.xmlSerialization, 'has no xmlSerialization');
      assert.isUndefined(result.writeOnly, 'has no writeOnly');
      assert.isUndefined(result.readOnly, 'has no readOnly');
      assert.isUndefined(result.documentation, 'has no documentation');
      assert.isUndefined(result.defaultValueStr, 'has no defaultValueStr');
      assert.isUndefined(result.defaultValue, 'has no defaultValue');
    });

    it('adds ScalarShape type', async () => {
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape });
      assert.typeOf(result, 'object', 'is an object');
      assert.typeOf(result.id, 'string', 'has the id');
      assert.typeOf(result.types, 'array', 'has the types array');
      assert.equal(result.types[0], ns.aml.vocabularies.shapes.ScalarShape, 'is ScalarShape');
      assert.deepEqual(result.values, [], 'has no values');
      assert.deepEqual(result.inherits, [], 'has no inherits');
      assert.deepEqual(result.or, [], 'has no or');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.xone, [], 'has no xone');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.isUndefined(result.name, 'has no name');
      assert.isUndefined(result.displayName, 'has no displayName');
      assert.isUndefined(result.description, 'has no description');
      assert.isUndefined(result.xmlSerialization, 'has no xmlSerialization');
      assert.isUndefined(result.writeOnly, 'has no writeOnly');
      assert.isUndefined(result.readOnly, 'has no readOnly');
      assert.isUndefined(result.documentation, 'has no documentation');
      assert.isUndefined(result.defaultValueStr, 'has no defaultValueStr');
      assert.isUndefined(result.defaultValue, 'has no defaultValue');
    });

    it('adds NodeShape type', async () => {
      const result = await store.addType({ type: ns.w3.shacl.NodeShape });
      assert.typeOf(result, 'object', 'is an object');
      assert.typeOf(result.id, 'string', 'has the id');
      assert.typeOf(result.types, 'array', 'has the types array');
      assert.equal(result.types[0], ns.w3.shacl.NodeShape, 'is NodeShape');
      assert.deepEqual(result.values, [], 'has no values');
      assert.deepEqual(result.inherits, [], 'has no inherits');
      assert.deepEqual(result.or, [], 'has no or');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.xone, [], 'has no xone');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.isUndefined(result.name, 'has no name');
      assert.isUndefined(result.displayName, 'has no displayName');
      assert.isUndefined(result.description, 'has no description');
      assert.isUndefined(result.xmlSerialization, 'has no xmlSerialization');
      assert.isUndefined(result.writeOnly, 'has no writeOnly');
      assert.isUndefined(result.readOnly, 'has no readOnly');
      assert.isUndefined(result.documentation, 'has no documentation');
      assert.isUndefined(result.defaultValueStr, 'has no defaultValueStr');
      assert.isUndefined(result.defaultValue, 'has no defaultValue');
    });

    it('adds UnionShape type', async () => {
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.UnionShape });
      assert.typeOf(result, 'object', 'is an object');
      assert.typeOf(result.id, 'string', 'has the id');
      assert.typeOf(result.types, 'array', 'has the types array');
      assert.equal(result.types[0], ns.aml.vocabularies.shapes.UnionShape, 'is UnionShape');
      assert.deepEqual(result.values, [], 'has no values');
      assert.deepEqual(result.inherits, [], 'has no inherits');
      assert.deepEqual(result.or, [], 'has no or');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.xone, [], 'has no xone');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.isUndefined(result.name, 'has no name');
      assert.isUndefined(result.displayName, 'has no displayName');
      assert.isUndefined(result.description, 'has no description');
      assert.isUndefined(result.xmlSerialization, 'has no xmlSerialization');
      assert.isUndefined(result.writeOnly, 'has no writeOnly');
      assert.isUndefined(result.readOnly, 'has no readOnly');
      assert.isUndefined(result.documentation, 'has no documentation');
      assert.isUndefined(result.defaultValueStr, 'has no defaultValueStr');
      assert.isUndefined(result.defaultValue, 'has no defaultValue');
    });

    it('adds FileShape type', async () => {
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.FileShape });
      assert.typeOf(result, 'object', 'is an object');
      assert.typeOf(result.id, 'string', 'has the id');
      assert.typeOf(result.types, 'array', 'has the types array');
      assert.equal(result.types[0], ns.aml.vocabularies.shapes.FileShape, 'is FileShape');
      assert.deepEqual(result.values, [], 'has no values');
      assert.deepEqual(result.inherits, [], 'has no inherits');
      assert.deepEqual(result.or, [], 'has no or');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.xone, [], 'has no xone');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.isUndefined(result.name, 'has no name');
      assert.isUndefined(result.displayName, 'has no displayName');
      assert.isUndefined(result.description, 'has no description');
      assert.isUndefined(result.xmlSerialization, 'has no xmlSerialization');
      assert.isUndefined(result.writeOnly, 'has no writeOnly');
      assert.isUndefined(result.readOnly, 'has no readOnly');
      assert.isUndefined(result.documentation, 'has no documentation');
      assert.isUndefined(result.defaultValueStr, 'has no defaultValueStr');
      assert.isUndefined(result.defaultValue, 'has no defaultValue');
    });

    it('adds SchemaShape type', async () => {
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.SchemaShape });
      assert.typeOf(result, 'object', 'is an object');
      assert.typeOf(result.id, 'string', 'has the id');
      assert.typeOf(result.types, 'array', 'has the types array');
      assert.equal(result.types[0], ns.aml.vocabularies.shapes.SchemaShape, 'is SchemaShape');
      assert.deepEqual(result.values, [], 'has no values');
      assert.deepEqual(result.inherits, [], 'has no inherits');
      assert.deepEqual(result.or, [], 'has no or');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.xone, [], 'has no xone');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.isUndefined(result.name, 'has no name');
      assert.isUndefined(result.displayName, 'has no displayName');
      assert.isUndefined(result.description, 'has no description');
      assert.isUndefined(result.xmlSerialization, 'has no xmlSerialization');
      assert.isUndefined(result.writeOnly, 'has no writeOnly');
      assert.isUndefined(result.readOnly, 'has no readOnly');
      assert.isUndefined(result.documentation, 'has no documentation');
      assert.isUndefined(result.defaultValueStr, 'has no defaultValueStr');
      assert.isUndefined(result.defaultValue, 'has no defaultValue');
    });

    it('adds ArrayShape type', async () => {
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ArrayShape });
      assert.typeOf(result, 'object', 'is an object');
      assert.typeOf(result.id, 'string', 'has the id');
      assert.typeOf(result.types, 'array', 'has the types array');
      assert.equal(result.types[0], ns.aml.vocabularies.shapes.ArrayShape, 'is ArrayShape');
      assert.deepEqual(result.values, [], 'has no values');
      assert.deepEqual(result.inherits, [], 'has no inherits');
      assert.deepEqual(result.or, [], 'has no or');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.xone, [], 'has no xone');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.isUndefined(result.name, 'has no name');
      assert.isUndefined(result.displayName, 'has no displayName');
      assert.isUndefined(result.description, 'has no description');
      assert.isUndefined(result.xmlSerialization, 'has no xmlSerialization');
      assert.isUndefined(result.writeOnly, 'has no writeOnly');
      assert.isUndefined(result.readOnly, 'has no readOnly');
      assert.isUndefined(result.documentation, 'has no documentation');
      assert.isUndefined(result.defaultValueStr, 'has no defaultValueStr');
      assert.isUndefined(result.defaultValue, 'has no defaultValue');
    });

    it('adds MatrixShape type', async () => {
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.MatrixShape });
      assert.typeOf(result, 'object', 'is an object');
      assert.typeOf(result.id, 'string', 'has the id');
      assert.typeOf(result.types, 'array', 'has the types array');
      assert.equal(result.types[0], ns.aml.vocabularies.shapes.ArrayShape, 'is ArrayShape');
      assert.deepEqual(result.values, [], 'has no values');
      assert.deepEqual(result.inherits, [], 'has no inherits');
      assert.deepEqual(result.or, [], 'has no or');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.xone, [], 'has no xone');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.isUndefined(result.name, 'has no name');
      assert.isUndefined(result.displayName, 'has no displayName');
      assert.isUndefined(result.description, 'has no description');
      assert.isUndefined(result.xmlSerialization, 'has no xmlSerialization');
      assert.isUndefined(result.writeOnly, 'has no writeOnly');
      assert.isUndefined(result.readOnly, 'has no readOnly');
      assert.isUndefined(result.documentation, 'has no documentation');
      assert.isUndefined(result.defaultValueStr, 'has no defaultValueStr');
      assert.isUndefined(result.defaultValue, 'has no defaultValue');
    });

    it('adds TupleShape type', async () => {
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.TupleShape });
      assert.typeOf(result, 'object', 'is an object');
      assert.typeOf(result.id, 'string', 'has the id');
      assert.typeOf(result.types, 'array', 'has the types array');
      assert.equal(result.types[0], ns.aml.vocabularies.shapes.TupleShape, 'is TupleShape');
      assert.deepEqual(result.values, [], 'has no values');
      assert.deepEqual(result.inherits, [], 'has no inherits');
      assert.deepEqual(result.or, [], 'has no or');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.and, [], 'has no and');
      assert.deepEqual(result.xone, [], 'has no xone');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.isUndefined(result.name, 'has no name');
      assert.isUndefined(result.displayName, 'has no displayName');
      assert.isUndefined(result.description, 'has no description');
      assert.isUndefined(result.xmlSerialization, 'has no xmlSerialization');
      assert.isUndefined(result.writeOnly, 'has no writeOnly');
      assert.isUndefined(result.readOnly, 'has no readOnly');
      assert.isUndefined(result.documentation, 'has no documentation');
      assert.isUndefined(result.defaultValueStr, 'has no defaultValueStr');
      assert.isUndefined(result.defaultValue, 'has no defaultValue');
    });

    it('adds the name', async () => {
      const value = 'new name';
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape, name: value });
      assert.equal(result.name, value);
    });

    it('adds the displayName', async () => {
      const value = 'new displayName';
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape, displayName: value });
      assert.equal(result.displayName, value);
    });

    it('adds the description', async () => {
      const value = 'new description';
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape, description: value });
      assert.equal(result.description, value);
    });

    it('adds the readOnly', async () => {
      const value = true;
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape, readOnly: value });
      assert.isTrue(result.readOnly);
    });

    it('adds the writeOnly', async () => {
      const value = true;
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape, writeOnly: value });
      assert.isTrue(result.writeOnly);
    });

    it('has the type in the graph', async () => {
      const created = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape });
      const result = await store.getType(created.id);
      assert.deepEqual(result, created);
    });

    it('dispatches the created event', async () => {
      store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape });
      const e = await oneEvent(window, StoreEventTypes.Type.State.created);
      const { detail } = e;
      assert.typeOf(detail.graphId, 'string', 'has the graphId');
      assert.typeOf(detail.domainType, 'string', 'has the domainType');
      assert.typeOf(detail.item, 'object', 'has the item');
    });

    it('creates the type from the event', async () => {
      const created = await StoreEvents.Type.add(window);
      const result = await store.getType(created.id);
      assert.deepEqual(result, created);
    });
  });

  describe('getType()', () => {
    let created;
    beforeEach(async () => {
      await store.createWebApi();
      created = await store.addType({ name: 'test-type' });
    });

    it('returns the type', async () => {
      const result = await store.getType(created.id);
      assert.deepEqual(result, created);
    });

    it('returns undefined when type not found', async () => {
      const result = await store.getType('unknown');
      assert.isUndefined(result);
    });

    it('reads the type from the event', async () => {
      const result = await StoreEvents.Type.get(window, created.id);
      assert.deepEqual(result, created);
    });
  });

  describe('deleteType()', () => {
    let id;
    beforeEach(async () => {
      await store.createWebApi();
      const created = await store.addType({ name: 'test-type' });
      id = created.id;
    });

    it('removes the object from the store', async () => {
      await store.deleteType(id);
      const doc = await store.getType(id);
      assert.isUndefined(doc);
    });

    it('removes the object from the store with the event', async () => {
      await StoreEvents.Type.delete(window, id);
      const doc = await store.getType(id);
      assert.isUndefined(doc);
    });

    it('dispatches the delete event', async () => {
      store.deleteType(id);
      const e = await oneEvent(window, StoreEventTypes.Type.State.deleted);
      const { detail } = e;
      assert.equal(detail.graphId, id, 'has the graphId');
      assert.equal(detail.domainType, ns.aml.vocabularies.shapes.AnyShape, 'has the graphType');
    });
  });

  describe('updateTypeProperty()', () => {
    describe('Updating ScalarShape', () => {
      let id;
      beforeEach(async () => {
        await store.createWebApi();
        const created = await store.addType({ 
          type: ns.aml.vocabularies.shapes.ScalarShape,
          name: 'test name',
          displayName: 'test display name',
          description: 'test description',
          readOnly: true,
          writeOnly: true,
        });
        id = created.id;
      });

      it('updates the name', async () => {
        const result = await store.updateTypeProperty(id, 'name', 'updated name');
        assert.equal(result.name, 'updated name', 'result has the updated name');
        const stored = await store.getType(id);
        assert.equal(stored.name, 'updated name', 'updated value is stored in the graph');
      });

      it('updates the displayName', async () => {
        const result = await store.updateTypeProperty(id, 'displayName', 'updated displayName');
        assert.equal(result.displayName, 'updated displayName', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.displayName, 'updated displayName', 'updated value is stored in the graph');
      });

      it('updates the description', async () => {
        const result = await store.updateTypeProperty(id, 'description', 'updated description');
        assert.equal(result.description, 'updated description', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.description, 'updated description', 'updated value is stored in the graph');
      });

      it('updates the dataType', async () => {
        const result = /** @type ApiScalarShape */ (await store.updateTypeProperty(id, 'dataType', 'updated dataType'));
        assert.equal(result.dataType, 'updated dataType', 'result has the updated value');
        const stored = /** @type ApiScalarShape */ (await store.getType(id));
        assert.equal(stored.dataType, 'updated dataType', 'updated value is stored in the graph');
      });

      it('updates the pattern', async () => {
        const result = /** @type ApiScalarShape */ (await store.updateTypeProperty(id, 'pattern', 'updated pattern'));
        assert.equal(result.pattern, 'updated pattern', 'result has the updated value');
        const stored = /** @type ApiScalarShape */ (await store.getType(id));
        assert.equal(stored.pattern, 'updated pattern', 'updated value is stored in the graph');
      });

      it('updates the minLength', async () => {
        const result = /** @type ApiScalarShape */ (await store.updateTypeProperty(id, 'minLength', 1));
        assert.equal(result.minLength, 1, 'result has the updated value');
        const stored = /** @type ApiScalarShape */ (await store.getType(id));
        assert.equal(stored.minLength, 1, 'updated value is stored in the graph');
      });

      it('updates the maxLength', async () => {
        const result = /** @type ApiScalarShape */ (await store.updateTypeProperty(id, 'maxLength', 1));
        assert.equal(result.maxLength, 1, 'result has the updated value');
        const stored = /** @type ApiScalarShape */ (await store.getType(id));
        assert.equal(stored.maxLength, 1, 'updated value is stored in the graph');
      });

      it('updates the minimum', async () => {
        const result = /** @type ApiScalarShape */ (await store.updateTypeProperty(id, 'minimum', 1));
        assert.equal(result.minimum, 1, 'result has the updated value');
        const stored = /** @type ApiScalarShape */ (await store.getType(id));
        assert.equal(stored.minimum, 1, 'updated value is stored in the graph');
      });

      it('updates the maximum', async () => {
        const result = /** @type ApiScalarShape */ (await store.updateTypeProperty(id, 'maximum', 1));
        assert.equal(result.maximum, 1, 'result has the updated value');
        const stored = /** @type ApiScalarShape */ (await store.getType(id));
        assert.equal(stored.maximum, 1, 'updated value is stored in the graph');
      });

      it('updates the exclusiveMinimum', async () => {
        const result = /** @type ApiScalarShape */ (await store.updateTypeProperty(id, 'exclusiveMinimum', true));
        assert.isTrue(result.exclusiveMinimum, 'result has the updated value');
        const stored = /** @type ApiScalarShape */ (await store.getType(id));
        assert.isTrue(stored.exclusiveMinimum, 'updated value is stored in the graph');
      });

      it('updates the exclusiveMaximum', async () => {
        const result = /** @type ApiScalarShape */ (await store.updateTypeProperty(id, 'exclusiveMaximum', true));
        assert.isTrue(result.exclusiveMaximum, 'result has the updated value');
        const stored = /** @type ApiScalarShape */ (await store.getType(id));
        assert.isTrue(stored.exclusiveMaximum, 'updated value is stored in the graph');
      });

      it('updates the format', async () => {
        const result = /** @type ApiScalarShape */ (await store.updateTypeProperty(id, 'format', 'updated format'));
        assert.equal(result.format, 'updated format', 'result has the updated value');
        const stored = /** @type ApiScalarShape */ (await store.getType(id));
        assert.equal(stored.format, 'updated format', 'updated value is stored in the graph');
      });

      it('updates the multipleOf', async () => {
        const result = /** @type ApiScalarShape */ (await store.updateTypeProperty(id, 'multipleOf', 1));
        assert.equal(result.multipleOf, 1, 'result has the updated value');
        const stored = /** @type ApiScalarShape */ (await store.getType(id));
        assert.equal(stored.multipleOf, 1, 'updated value is stored in the graph');
      });

      it('throws for an unknown property', async () => {
        let thrown = false;
        try {
          await store.updateTypeProperty(id, 'unknown', 'updated value');
        } catch (e) {
          thrown = true;
        }
        assert.isTrue(thrown);
      });
    });

    describe('Updating NodeShape', () => {
      let id;
      beforeEach(async () => {
        await store.createWebApi();
        const created = await store.addType({ 
          type: ns.w3.shacl.NodeShape,
          name: 'test name',
          displayName: 'test display name',
          description: 'test description',
          readOnly: true,
          writeOnly: true,
        });
        id = created.id;
      });

      it('updates the name', async () => {
        const result = await store.updateTypeProperty(id, 'name', 'updated name');
        assert.equal(result.name, 'updated name', 'result has the updated name');
        const stored = await store.getType(id);
        assert.equal(stored.name, 'updated name', 'updated value is stored in the graph');
      });

      it('updates the displayName', async () => {
        const result = await store.updateTypeProperty(id, 'displayName', 'updated displayName');
        assert.equal(result.displayName, 'updated displayName', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.displayName, 'updated displayName', 'updated value is stored in the graph');
      });

      it('updates the description', async () => {
        const result = await store.updateTypeProperty(id, 'description', 'updated description');
        assert.equal(result.description, 'updated description', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.description, 'updated description', 'updated value is stored in the graph');
      });

      it('updates the minProperties', async () => {
        const result = /** @type ApiNodeShape */ (await store.updateTypeProperty(id, 'minProperties', 1));
        assert.equal(result.minProperties, 1, 'result has the updated value');
        const stored = /** @type ApiNodeShape */ (await store.getType(id));
        assert.equal(stored.minProperties, 1, 'updated value is stored in the graph');
      });

      it('updates the maxProperties', async () => {
        const result = /** @type ApiNodeShape */ (await store.updateTypeProperty(id, 'maxProperties', 1));
        assert.equal(result.maxProperties, 1, 'result has the updated value');
        const stored = /** @type ApiNodeShape */ (await store.getType(id));
        assert.equal(stored.maxProperties, 1, 'updated value is stored in the graph');
      });

      it('updates the closed', async () => {
        const result = /** @type ApiNodeShape */ (await store.updateTypeProperty(id, 'closed', true));
        assert.equal(result.closed, true, 'result has the updated value');
        const stored = /** @type ApiNodeShape */ (await store.getType(id));
        assert.equal(stored.closed, true, 'updated value is stored in the graph');
      });

      it('updates the discriminator', async () => {
        const result = /** @type ApiNodeShape */ (await store.updateTypeProperty(id, 'discriminator', 'updated discriminator'));
        assert.equal(result.discriminator, 'updated discriminator', 'result has the updated value');
        const stored = /** @type ApiNodeShape */ (await store.getType(id));
        assert.equal(stored.discriminator, 'updated discriminator', 'updated value is stored in the graph');
      });

      it('updates the discriminatorValue', async () => {
        const result = /** @type ApiNodeShape */ (await store.updateTypeProperty(id, 'discriminatorValue', 'updated discriminatorValue'));
        assert.equal(result.discriminatorValue, 'updated discriminatorValue', 'result has the updated value');
        const stored = /** @type ApiNodeShape */ (await store.getType(id));
        assert.equal(stored.discriminatorValue, 'updated discriminatorValue', 'updated value is stored in the graph');
      });

      it('throws for an unknown property', async () => {
        let thrown = false;
        try {
          await store.updateTypeProperty(id, 'unknown', 'updated value');
        } catch (e) {
          thrown = true;
        }
        assert.isTrue(thrown);
      });
    });

    describe('Updating UnionShape', () => {
      let id;
      beforeEach(async () => {
        await store.createWebApi();
        const created = await store.addType({ 
          type: ns.aml.vocabularies.shapes.UnionShape,
          name: 'test name',
          displayName: 'test display name',
          description: 'test description',
          readOnly: true,
          writeOnly: true,
        });
        id = created.id;
      });

      it('updates the name', async () => {
        const result = await store.updateTypeProperty(id, 'name', 'updated name');
        assert.equal(result.name, 'updated name', 'result has the updated name');
        const stored = await store.getType(id);
        assert.equal(stored.name, 'updated name', 'updated value is stored in the graph');
      });

      it('updates the displayName', async () => {
        const result = await store.updateTypeProperty(id, 'displayName', 'updated displayName');
        assert.equal(result.displayName, 'updated displayName', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.displayName, 'updated displayName', 'updated value is stored in the graph');
      });

      it('updates the description', async () => {
        const result = await store.updateTypeProperty(id, 'description', 'updated description');
        assert.equal(result.description, 'updated description', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.description, 'updated description', 'updated value is stored in the graph');
      });

      it('throws for an unknown property', async () => {
        let thrown = false;
        try {
          await store.updateTypeProperty(id, 'unknown', 'updated value');
        } catch (e) {
          thrown = true;
        }
        assert.isTrue(thrown);
      });
    });

    describe('Updating FileShape', () => {
      let id;
      beforeEach(async () => {
        await store.createWebApi();
        const created = await store.addType({ 
          type: ns.aml.vocabularies.shapes.FileShape,
          name: 'test name',
          displayName: 'test display name',
          description: 'test description',
          readOnly: true,
          writeOnly: true,
        });
        id = created.id;
      });

      it('updates the name', async () => {
        const result = await store.updateTypeProperty(id, 'name', 'updated name');
        assert.equal(result.name, 'updated name', 'result has the updated name');
        const stored = await store.getType(id);
        assert.equal(stored.name, 'updated name', 'updated value is stored in the graph');
      });

      it('updates the displayName', async () => {
        const result = await store.updateTypeProperty(id, 'displayName', 'updated displayName');
        assert.equal(result.displayName, 'updated displayName', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.displayName, 'updated displayName', 'updated value is stored in the graph');
      });

      it('updates the description', async () => {
        const result = await store.updateTypeProperty(id, 'description', 'updated description');
        assert.equal(result.description, 'updated description', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.description, 'updated description', 'updated value is stored in the graph');
      });

      it('updates the fileTypes', async () => {
        const result = /** @type ApiFileShape */ (await store.updateTypeProperty(id, 'fileTypes', ['json']));
        assert.deepEqual(result.fileTypes, ['json'], 'result has the updated value');
        const stored = /** @type ApiFileShape */ (await store.getType(id));
        assert.deepEqual(stored.fileTypes, ['json'], 'updated value is stored in the graph');
      });

      it('updates the pattern', async () => {
        const result = /** @type ApiFileShape */ (await store.updateTypeProperty(id, 'pattern', 'updated pattern'));
        assert.equal(result.pattern, 'updated pattern', 'result has the updated value');
        const stored = /** @type ApiFileShape */ (await store.getType(id));
        assert.equal(stored.pattern, 'updated pattern', 'updated value is stored in the graph');
      });

      it('updates the minLength', async () => {
        const result = /** @type ApiFileShape */ (await store.updateTypeProperty(id, 'minLength', 1));
        assert.equal(result.minLength, 1, 'result has the updated value');
        const stored = /** @type ApiFileShape */ (await store.getType(id));
        assert.equal(stored.minLength, 1, 'updated value is stored in the graph');
      });

      it('updates the maxLength', async () => {
        const result = /** @type ApiFileShape */ (await store.updateTypeProperty(id, 'maxLength', 1));
        assert.equal(result.maxLength, 1, 'result has the updated value');
        const stored = /** @type ApiFileShape */ (await store.getType(id));
        assert.equal(stored.maxLength, 1, 'updated value is stored in the graph');
      });

      it('updates the minimum', async () => {
        const result = /** @type ApiFileShape */ (await store.updateTypeProperty(id, 'minimum', 1));
        assert.equal(result.minimum, 1, 'result has the updated value');
        const stored = /** @type ApiFileShape */ (await store.getType(id));
        assert.equal(stored.minimum, 1, 'updated value is stored in the graph');
      });

      it('updates the maximum', async () => {
        const result = /** @type ApiFileShape */ (await store.updateTypeProperty(id, 'maximum', 1));
        assert.equal(result.maximum, 1, 'result has the updated value');
        const stored = /** @type ApiFileShape */ (await store.getType(id));
        assert.equal(stored.maximum, 1, 'updated value is stored in the graph');
      });

      it('updates the exclusiveMinimum', async () => {
        const result = /** @type ApiFileShape */ (await store.updateTypeProperty(id, 'exclusiveMinimum', true));
        assert.isTrue(result.exclusiveMinimum, 'result has the updated value');
        const stored = /** @type ApiFileShape */ (await store.getType(id));
        assert.isTrue(stored.exclusiveMinimum, 'updated value is stored in the graph');
      });

      it('updates the exclusiveMaximum', async () => {
        const result = /** @type ApiFileShape */ (await store.updateTypeProperty(id, 'exclusiveMaximum', true));
        assert.isTrue(result.exclusiveMaximum, 'result has the updated value');
        const stored = /** @type ApiFileShape */ (await store.getType(id));
        assert.isTrue(stored.exclusiveMaximum, 'updated value is stored in the graph');
      });

      it('updates the format', async () => {
        const result = /** @type ApiFileShape */ (await store.updateTypeProperty(id, 'format', 'updated format'));
        assert.equal(result.format, 'updated format', 'result has the updated value');
        const stored = /** @type ApiFileShape */ (await store.getType(id));
        assert.equal(stored.format, 'updated format', 'updated value is stored in the graph');
      });

      it('updates the multipleOf', async () => {
        const result = /** @type ApiFileShape */ (await store.updateTypeProperty(id, 'multipleOf', 1));
        assert.equal(result.multipleOf, 1, 'result has the updated value');
        const stored = /** @type ApiFileShape */ (await store.getType(id));
        assert.equal(stored.multipleOf, 1, 'updated value is stored in the graph');
      });

      it('throws for an unknown property', async () => {
        let thrown = false;
        try {
          await store.updateTypeProperty(id, 'unknown', 'updated value');
        } catch (e) {
          thrown = true;
        }
        assert.isTrue(thrown);
      });
    });

    describe('Updating SchemaShape', () => {
      let id;
      beforeEach(async () => {
        await store.createWebApi();
        const created = await store.addType({ 
          type: ns.aml.vocabularies.shapes.SchemaShape,
          name: 'test name',
          displayName: 'test display name',
          description: 'test description',
          readOnly: true,
          writeOnly: true,
        });
        id = created.id;
      });

      it('updates the name', async () => {
        const result = await store.updateTypeProperty(id, 'name', 'updated name');
        assert.equal(result.name, 'updated name', 'result has the updated name');
        const stored = await store.getType(id);
        assert.equal(stored.name, 'updated name', 'updated value is stored in the graph');
      });

      it('updates the displayName', async () => {
        const result = await store.updateTypeProperty(id, 'displayName', 'updated displayName');
        assert.equal(result.displayName, 'updated displayName', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.displayName, 'updated displayName', 'updated value is stored in the graph');
      });

      it('updates the description', async () => {
        const result = await store.updateTypeProperty(id, 'description', 'updated description');
        assert.equal(result.description, 'updated description', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.description, 'updated description', 'updated value is stored in the graph');
      });

      it('updates the mediaType', async () => {
        const result = /** @type ApiSchemaShape */ (await store.updateTypeProperty(id, 'mediaType', 'updated mediaType'));
        assert.equal(result.mediaType, 'updated mediaType', 'result has the updated value');
        const stored = /** @type ApiSchemaShape */ (await store.getType(id));
        assert.equal(stored.mediaType, 'updated mediaType', 'updated value is stored in the graph');
      });

      it('updates the raw', async () => {
        const result = /** @type ApiSchemaShape */ (await store.updateTypeProperty(id, 'raw', 'updated raw'));
        assert.equal(result.raw, 'updated raw', 'result has the updated value');
        const stored = /** @type ApiSchemaShape */ (await store.getType(id));
        assert.equal(stored.raw, 'updated raw', 'updated value is stored in the graph');
      });

      it('throws for an unknown property', async () => {
        let thrown = false;
        try {
          await store.updateTypeProperty(id, 'unknown', 'updated value');
        } catch (e) {
          thrown = true;
        }
        assert.isTrue(thrown);
      });
    });

    describe('Updating ArrayShape', () => {
      let id;
      beforeEach(async () => {
        await store.createWebApi();
        const created = await store.addType({ 
          type: ns.aml.vocabularies.shapes.ArrayShape,
          name: 'test name',
          displayName: 'test display name',
          description: 'test description',
          readOnly: true,
          writeOnly: true,
        });
        id = created.id;
      });

      it('updates the name', async () => {
        const result = await store.updateTypeProperty(id, 'name', 'updated name');
        assert.equal(result.name, 'updated name', 'result has the updated name');
        const stored = await store.getType(id);
        assert.equal(stored.name, 'updated name', 'updated value is stored in the graph');
      });

      it('updates the displayName', async () => {
        const result = await store.updateTypeProperty(id, 'displayName', 'updated displayName');
        assert.equal(result.displayName, 'updated displayName', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.displayName, 'updated displayName', 'updated value is stored in the graph');
      });

      it('updates the description', async () => {
        const result = await store.updateTypeProperty(id, 'description', 'updated description');
        assert.equal(result.description, 'updated description', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.description, 'updated description', 'updated value is stored in the graph');
      });

      it('throws for an unknown property', async () => {
        let thrown = false;
        try {
          await store.updateTypeProperty(id, 'unknown', 'updated value');
        } catch (e) {
          thrown = true;
        }
        assert.isTrue(thrown);
      });
    });

    describe('Updating TupleShape', () => {
      let id;
      beforeEach(async () => {
        await store.createWebApi();
        const created = await store.addType({ 
          type: ns.aml.vocabularies.shapes.TupleShape,
          name: 'test name',
          displayName: 'test display name',
          description: 'test description',
          readOnly: true,
          writeOnly: true,
        });
        id = created.id;
      });

      it('updates the name', async () => {
        const result = await store.updateTypeProperty(id, 'name', 'updated name');
        assert.equal(result.name, 'updated name', 'result has the updated name');
        const stored = await store.getType(id);
        assert.equal(stored.name, 'updated name', 'updated value is stored in the graph');
      });

      it('updates the displayName', async () => {
        const result = await store.updateTypeProperty(id, 'displayName', 'updated displayName');
        assert.equal(result.displayName, 'updated displayName', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.displayName, 'updated displayName', 'updated value is stored in the graph');
      });

      it('updates the description', async () => {
        const result = await store.updateTypeProperty(id, 'description', 'updated description');
        assert.equal(result.description, 'updated description', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.description, 'updated description', 'updated value is stored in the graph');
      });

      // This seems not to be working in AMF.
      it.skip('updates the additionalItems', async () => {
        const result = /** @type ApiTupleShape */ (await store.updateTypeProperty(id, 'additionalItems', true));
        assert.equal(result.additionalItems, true, 'result has the updated value');
        const stored = /** @type ApiTupleShape */ (await store.getType(id));
        assert.equal(stored.additionalItems, true, 'updated value is stored in the graph');
      });

      it('throws for an unknown property', async () => {
        let thrown = false;
        try {
          await store.updateTypeProperty(id, 'unknown', 'updated value');
        } catch (e) {
          thrown = true;
        }
        assert.isTrue(thrown);
      });
    });

    describe('Updating AnyShape', () => {
      let id;
      beforeEach(async () => {
        await store.createWebApi();
        const created = await store.addType({ 
          type: ns.aml.vocabularies.shapes.AnyShape,
          name: 'test name',
          displayName: 'test display name',
          description: 'test description',
          readOnly: true,
          writeOnly: true,
        });
        id = created.id;
      });

      it('updates the name', async () => {
        const result = await store.updateTypeProperty(id, 'name', 'updated name');
        assert.equal(result.name, 'updated name', 'result has the updated name');
        const stored = await store.getType(id);
        assert.equal(stored.name, 'updated name', 'updated value is stored in the graph');
      });

      it('updates the displayName', async () => {
        const result = await store.updateTypeProperty(id, 'displayName', 'updated displayName');
        assert.equal(result.displayName, 'updated displayName', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.displayName, 'updated displayName', 'updated value is stored in the graph');
      });

      it('updates the description', async () => {
        const result = await store.updateTypeProperty(id, 'description', 'updated description');
        assert.equal(result.description, 'updated description', 'result has the updated value');
        const stored = await store.getType(id);
        assert.equal(stored.description, 'updated description', 'updated value is stored in the graph');
      });

      it('throws for an unknown property', async () => {
        let thrown = false;
        try {
          await store.updateTypeProperty(id, 'unknown', 'updated value');
        } catch (e) {
          thrown = true;
        }
        assert.isTrue(thrown);
      });
    });

    describe('Events', () => {
      let id;
      beforeEach(async () => {
        await store.createWebApi();
        const created = await store.addType({ 
          type: ns.aml.vocabularies.shapes.ScalarShape,
          name: 'test name',
        });
        id = created.id;
      });

      it('updates a property from the event', async () => {
        await StoreEvents.Type.update(window, id, 'name', 'updated name');
        const stored = await store.getType(id);
        assert.equal(stored.name, 'updated name', 'updated value is stored in the graph');
      });

      it('dispatches the change event', async () => {
        store.updateTypeProperty(id, 'name', 'value');
        const e = await oneEvent(window, StoreEventTypes.Type.State.updated);
        const { detail } = e;
        assert.equal(detail.graphId, id, 'has the graphId');
        assert.equal(detail.domainType, ns.aml.vocabularies.shapes.ScalarShape, 'has the graphType');
        assert.equal(detail.property, 'name', 'has the property');
        assert.typeOf(detail.item, 'object', 'has the item');
      });
    });
  });
});
