import { assert, oneEvent } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, StoreEvents, StoreEventTypes, ns } from '../../worker.index.js';

/** @typedef {import('amf-client-js').PropertyShape} PropertyShape */
/** @typedef {import('../../').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('../../').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('../..').ApiScalarShape} ApiScalarShape */
/** @typedef {import('../..').ApiNodeShape} ApiNodeShape */
/** @typedef {import('../..').ApiFileShape} ApiFileShape */
/** @typedef {import('../..').ApiSchemaShape} ApiSchemaShape */
/** @typedef {import('../..').ApiTupleShape} ApiTupleShape */
/** @typedef {import('../..').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('../..').ApiScalarNode} ApiScalarNode */

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
      await store.loadGraph(demoApi, 'RAML 1.0');
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

    it('adds the default type', async () => {
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
      assert.isUndefined(result.writeOnly, 'is not writeOnly');
      assert.isUndefined(result.readOnly, 'is not readOnly');
      assert.isUndefined(result.deprecated, 'is not deprecated');
      assert.isUndefined(result.documentation, 'has no documentation');
      assert.isUndefined(result.defaultValueStr, 'has no defaultValueStr');
      assert.isUndefined(result.defaultValue, 'has no defaultValue');
    });

    it('adds ScalarShape type', async () => {
      const result = /** @type ApiScalarShape */ (await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape }));
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
      assert.isUndefined(result.writeOnly, 'is not writeOnly');
      assert.isUndefined(result.readOnly, 'is not readOnly');
      assert.isUndefined(result.deprecated, 'is not deprecated');
      assert.isUndefined(result.exclusiveMaximum, 'is not exclusiveMaximum');
      assert.isUndefined(result.exclusiveMinimum, 'is not exclusiveMinimum');
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
      assert.isUndefined(result.writeOnly, 'is not writeOnly');
      assert.isUndefined(result.readOnly, 'is not readOnly');
      assert.isUndefined(result.deprecated, 'is not deprecated');
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
      assert.isUndefined(result.writeOnly, 'is not writeOnly');
      assert.isUndefined(result.readOnly, 'is not readOnly');
      assert.isUndefined(result.deprecated, 'is not deprecated');
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
      assert.isUndefined(result.writeOnly, 'is not writeOnly');
      assert.isUndefined(result.readOnly, 'is not readOnly');
      assert.isUndefined(result.deprecated, 'is not deprecated');
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
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi, 'RAML 1.0');
    });

    /**
     * @param {string} name
     * @returns {Promise<ApiShapeUnion>} 
     */
    async function getShape(name) {
      const types = await store.listTypes();
      const item = types.find(t => t.name === name);
      if (!item) {
        throw new Error(`The shape ${name} does not exist in the API.`);
      }
      return store.getType(item.id);
    }

    it('returns an object', async () => {
      const result = await getShape('ErrorResource');
      assert.typeOf(result, 'object');
    });

    it('returns undefined when type not found', async () => {
      const result = await store.getType('unknown');
      assert.isUndefined(result);
    });

    it('reads the type from the event', async () => {
      const type = await getShape('ErrorResource');
      const result = await StoreEvents.Type.get(window, type.id);
      assert.deepEqual(result, type);
    });

    it('serializes the default value string', async () => {
      const type = /** @type ApiNodeShape */ (await getShape('ErrorResource'));
      const [error] = type.properties;
      assert.equal(error.range.defaultValueStr, 'true', 'has the default value string');
    });

    it('serializes the default value node', async () => {
      const type = /** @type ApiNodeShape */ (await getShape('ErrorResource'));
      const [error] = type.properties;
      const { defaultValue } = error.range;
      assert.typeOf(defaultValue, 'object', 'the defaultValue is an object');
      assert.include(defaultValue.types, ns.aml.vocabularies.data.Scalar, 'is a Scalar node');
      assert.typeOf(defaultValue.name, 'string', 'has a name');
      const typed = /** @type ApiScalarNode */ (defaultValue);
      assert.equal(typed.value, 'true', 'has the value');
      assert.equal(typed.dataType, ns.w3.xmlSchema.boolean, 'has the dataType');
    });

    it('has serialized inherits property', async () => {
      const type = /** @type ApiNodeShape */ (await getShape('AppPerson'));
      const { inherits } = type;
      assert.typeOf(inherits, 'array', 'inherits is an array');
      assert.lengthOf(inherits, 1, 'has one parent');
      const [inherit] = inherits;
      assert.typeOf(inherit, 'object', 'the inherit is an object');
      assert.include(inherit.types, ns.w3.shacl.NodeShape, 'has the NodeShape type');
    });

    it('has the link name', async () => {
      const type = /** @type ApiNodeShape */ (await getShape('AppPerson'));
      assert.equal(type.name, 'AppPerson');
    });

    it('has the displayName', async () => {
      const type = /** @type ApiNodeShape */ (await getShape('AppPerson'));
      assert.equal(type.displayName, 'A person resource');
    });
  });

  describe('getTypes()', () => {
    let ids = /** @type string[] */ (null);
    beforeEach(async () => {
      await store.createWebApi();
      const t1 = await store.addType({ name: 'test-type1' });
      const t2 = await store.addType({ name: 'test-type2' });
      const t3 = await store.addType({ name: 'test-type3' });
      ids = [t1.id, t2.id, t3.id];
    });

    it('reads the types from the store', async () => {
      const result = await store.getTypes(ids);
      assert.typeOf(result, 'array', 'result is an array');
      assert.lengthOf(result, 3, 'has all the results');
      assert.ok(result[0], 'has result #1');
      assert.ok(result[1], 'has result #2');
      assert.ok(result[2], 'has result #3');
    });

    it('inserts undefined when no type', async () => {
      const result = await store.getTypes([ids[0], 'tUnknown', ids[2]]);
      assert.typeOf(result, 'array', 'result is an array');
      assert.lengthOf(result, 3, 'has all results');
      assert.ok(result[0], 'has first result');
      assert.isUndefined(result[1], 'has no missing result');
      assert.ok(result[2], 'has third result');
    });

    it('can query bulk with the event', async () => {
      const result = await StoreEvents.Type.getBulk(window, ids);
      assert.typeOf(result, 'array', 'result is an array');
      assert.lengthOf(result, 3, 'has all results');
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
      // it.skip('updates the additionalItems', async () => {
      //   const result = /** @type ApiTupleShape */ (await store.updateTypeProperty(id, 'additionalItems', true));
      //   assert.equal(result.additionalItems, true, 'result has the updated value');
      //   const stored = /** @type ApiTupleShape */ (await store.getType(id));
      //   assert.equal(stored.additionalItems, true, 'updated value is stored in the graph');
      // });

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

  describe('addPropertyShape()', () => {
    /** @type string */
    let typeId;
    beforeEach(async () => {
      await store.createWebApi();
      const result = await store.addType({
        type: ns.w3.shacl.NodeShape,
      });
      typeId = result.id;
    });

    const initBase = Object.freeze({ name: 'test property' });

    it('creates a new property and returns it', async () => {
      const result = await store.addPropertyShape(typeId, { ...initBase });
      assert.typeOf(result, 'object', 'has the result');
      assert.equal(result.name, 'test property');
      assert.equal(result.types[0], ns.w3.shacl.PropertyShape, 'is a PropertyShape');
    });

    it('adds multiple properties', async () => {
      const result1 = await store.addPropertyShape(typeId, { ...initBase });
      const result2 = await store.addPropertyShape(typeId, { name: 'other property' });
      assert.typeOf(result1, 'object', 'has the result');
      assert.equal(result1.name, 'test property');
      assert.equal(result1.types[0], ns.w3.shacl.PropertyShape, 'is a PropertyShape');
      const type = /** @type ApiNodeShape */ (await store.getType(typeId));
      const [p1, p2] = type.properties;
      assert.deepEqual(result1, p1, 'has the property #1');
      assert.deepEqual(result2, p2, 'has the property #2');
    });

    [
      'displayName', 'description', 'defaultValueStr', 'patternName', 
    ].forEach((prop) => {
      it(`adds the ${prop}`, async () => {
        const value = 'added value';
        const result = await store.addPropertyShape(typeId, { ...initBase, [prop]: value });
        assert.equal(result[prop], value, 'returns the property');
        const stored = await store.getPropertyShape(result.id);
        assert.equal(stored[prop], value, 'stores the property');
      });

      it(`ignores invalid type for ${prop}`, async () => {
        const result = await store.addPropertyShape(typeId, { ...initBase, [prop]: true });
        assert.isUndefined(result[prop], 'has no property');
      });
    });

    [
      'deprecated', 'readOnly', 'writeOnly', 
    ].forEach((prop) => {
      it(`adds the ${prop}`, async () => {
        const value = true;
        const result = await store.addPropertyShape(typeId, { ...initBase, [prop]: value });
        assert.strictEqual(result[prop], value, 'returns the property');
        const stored = await store.getPropertyShape(result.id);
        assert.strictEqual(stored[prop], value, 'stores the property');
      });

      it(`ignores invalid type for ${prop}`, async () => {
        const result = await store.addPropertyShape(typeId, { ...initBase, [prop]: 'test' });
        assert.isUndefined(result[prop], 'has no property');
      });
    });

    [
      'minCount', 'maxCount', 
    ].forEach((prop) => {
      it(`adds the ${prop}`, async () => {
        const value = 10;
        const result = await store.addPropertyShape(typeId, { ...initBase, [prop]: value });
        assert.strictEqual(result[prop], value, 'returns the property');
        const stored = await store.getPropertyShape(result.id);
        assert.strictEqual(stored[prop], value, 'stores the property');
      });

      it(`ignores invalid type for ${prop}`, async () => {
        const result = await store.addPropertyShape(typeId, { ...initBase, [prop]: 'test' });
        assert.isUndefined(result[prop], 'has no property');
      });
    });

    it(`adds the range`, async () => {
      const result = await store.addPropertyShape(typeId, { ...initBase, range: { name: 'range name' } });
      assert.typeOf(result.range, 'object', 'has the range');
      assert.equal(result.range.name, 'range name', 'has the passed init properties');
      const stored = await store.getPropertyShape(result.id);
      assert.equal(stored.range.name, 'range name', 'stores the range');
    });

    it('throws when unknown type', async () => {
      let msg;
      try {
        await store.addPropertyShape('unknown', { name: 'test property' });
      } catch (e) {
        msg = e.message;
      }
      assert.equal(msg, 'No type for unknown');
    });

    it('throws when not a node type type', async () => {
      const type = await store.addType();
      let msg;
      try {
        await store.addPropertyShape(type.id, { name: 'test property' });
      } catch (e) {
        msg = e.message;
      }
      assert.equal(msg, 'Unable to add a property to a non Node shape.');
    });

    it('throws when no init object', async () => {
      let msg;
      try {
        await store.addPropertyShape(typeId, undefined);
      } catch (e) {
        msg = e.message;
      }
      assert.equal(msg, 'Missing property initialization object.');
    });

    it('throws when no name in the init object', async () => {
      let msg;
      try {
        await store.addPropertyShape(typeId, { name: undefined });
      } catch (e) {
        msg = e.message;
      }
      assert.equal(msg, 'Missing property name.');
    });

    it('creates the property from the event', async () => {
      const created = await StoreEvents.Type.addProperty(window, typeId, { ...initBase });
      const stored = await StoreEvents.Type.getProperty(window, created.id);
      assert.deepEqual(stored, created);
    });

    it('dispatches the created event', async () => {
      store.addPropertyShape(typeId, { ...initBase });
      const e = await oneEvent(window, StoreEventTypes.Type.State.propertyCreated);
      const { detail } = e;
      assert.typeOf(detail.graphId, 'string', 'has the graphId');
      assert.typeOf(detail.domainType, 'string', 'has the domainType');
      assert.typeOf(detail.item, 'object', 'has the item');
      assert.equal(detail.domainParent, typeId, 'has the domainParent');
    });
  });

  describe('updatePropertyShapeProperty()', () => {
    /** @type string */
    let propertyId;
    /** @type string */
    let typeId;
    beforeEach(async () => {
      await store.createWebApi();
      const type = await store.addType({
        type: ns.w3.shacl.NodeShape,
      });
      typeId = type.id;
      const result = await store.addPropertyShape(typeId, { name: 'a property' });
      propertyId = result.id;
    });

    [
      'name', 'description', 'defaultValueStr', 'displayName', 'patternName',
    ].forEach((prop) => {
      const property = /** @type keyof PropertyShape */ (prop);
      it(`updates the ${property}`, async () => {
        const result = await store.updatePropertyShapeProperty(typeId, propertyId, property, `updated ${property}`);
        assert.equal(result[property], `updated ${property}`, 'result has the updated property');
        const stored = await store.getPropertyShape(propertyId);
        assert.equal(stored[property], `updated ${property}`, 'updated value is stored in the graph');
      });
    });

    [
      'deprecated', 'readOnly', 'writeOnly',
    ].forEach((prop) => {
      const property = /** @type keyof PropertyShape */ (prop);
      it(`updates the ${property}`, async () => {
        const result = await store.updatePropertyShapeProperty(typeId, propertyId, property, true);
        assert.isTrue(result[property], 'result has the updated property');
        const stored = await store.getPropertyShape(propertyId);
        assert.isTrue(stored[property], 'updated value is stored in the graph');
      });
    });

    [
      'minCount', 'maxCount',
    ].forEach((prop) => {
      const property = /** @type keyof PropertyShape */ (prop);
      it(`updates the ${property}`, async () => {
        const result = await store.updatePropertyShapeProperty(typeId, propertyId, property, 5);
        assert.equal(result[property], 5, 'result has the updated property');
        const stored = await store.getPropertyShape(propertyId);
        assert.equal(stored[property], 5, 'updated value is stored in the graph');
      });
    });

    it('throws when unknown property', async () => {
      let msg;
      try {
        // @ts-ignore
        await store.updatePropertyShapeProperty(typeId, propertyId, 'unknown', 5);
      } catch (e) {
        msg = e.message;
      }
      assert.equal(msg, 'Unsupported patch property of PropertyShape: unknown');
    });

    it('updates the property from the event', async () => {
      await StoreEvents.Type.updateProperty(window, typeId, propertyId, 'deprecated', true);
      const stored = await store.getPropertyShape(propertyId);
      assert.isTrue(stored.deprecated, 'updated value is stored in the graph');
    });

    it('dispatches the change event', async () => {
      store.updatePropertyShapeProperty(typeId, propertyId, 'deprecated', true);
      const e = await oneEvent(window, StoreEventTypes.Type.State.propertyUpdated);
      const { detail } = e;
      assert.equal(detail.graphId, propertyId, 'has the graphId');
      assert.equal(detail.domainType, ns.w3.shacl.PropertyShape, 'has the graphType');
      assert.equal(detail.domainParent, typeId, 'has the domainParent');
      assert.equal(detail.property, 'deprecated', 'has the property');
      assert.typeOf(detail.item, 'object', 'has the item');
    });
  });

  describe('deletePropertyShape()', () => {
    /** @type string */
    let propertyId;
    /** @type string */
    let typeId;
    beforeEach(async () => {
      await store.createWebApi();
      const type = await store.addType({
        type: ns.w3.shacl.NodeShape,
      });
      typeId = type.id;
      const result = await store.addPropertyShape(typeId, { name: 'a property' });
      propertyId = result.id;
    });

    it('removes the property from the type', async () => {
      await store.deletePropertyShape(typeId, propertyId);
      const type = /** @type ApiNodeShape */ (await store.getType(typeId));
      assert.deepEqual(type.properties, []);
    });

    it('removes the selected property only', async () => {
      const other = await store.addPropertyShape(typeId, { name: 'other property' });
      await store.deletePropertyShape(typeId, propertyId);
      const type = /** @type ApiNodeShape */ (await store.getType(typeId));
      assert.deepEqual(type.properties, [other]);
    });

    it('removes the property from the event', async () => {
      await StoreEvents.Type.deleteProperty(window, propertyId, typeId);
      const type = /** @type ApiNodeShape */ (await store.getType(typeId));
      assert.deepEqual(type.properties, []);
    });

    it('dispatches the delete event', async () => {
      store.deletePropertyShape(typeId, propertyId);
      const e = await oneEvent(window, StoreEventTypes.Type.State.propertyDeleted);
      const { detail } = e;
      assert.equal(detail.graphId, propertyId, 'has the graphId');
      assert.equal(detail.domainType, ns.w3.shacl.PropertyShape, 'has the graphType');
      assert.equal(detail.domainParent, typeId, 'has the domainParent');
    });
  });
});
