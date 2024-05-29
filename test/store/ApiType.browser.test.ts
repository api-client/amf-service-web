import { assert, oneEvent } from '@open-wc/testing';
import { AmfShapes, AmfNamespace as ns } from "@api-client/core/build/esm/browser.js";
import { AmfLoader } from '../helpers/AmfLoader.js';
import { WebWorkerService, StoreEvents, StoreEventTypes } from '../../src/worker.index.js';
import { PropertyShapeInit } from '../../src/types.js';
import createTestService from '../helpers/web-service.js';

describe('WebWorkerService', () => {
  let store: WebWorkerService;
  before(async () => {
    store = createTestService();
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
      assert.lengthOf(result, 19, 'has all types definitions');
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
      const result = await store.addType() as AmfShapes.IApiAnyShape;
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
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape }) as AmfShapes.IApiScalarShape;
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
      const result = await store.addType({ type: ns.w3.shacl.NodeShape }) as AmfShapes.IApiNodeShape;
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
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.UnionShape }) as AmfShapes.IApiUnionShape;
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
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.FileShape }) as AmfShapes.IApiFileShape;
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
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.SchemaShape }) as AmfShapes.IApiSchemaShape;
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
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ArrayShape }) as AmfShapes.IApiArrayShape;
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
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.MatrixShape }) as AmfShapes.IApiArrayShape;
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
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.TupleShape }) as AmfShapes.IApiArrayShape;
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
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape, name: value }) as AmfShapes.IApiScalarShape;
      assert.equal(result.name, value);
    });

    it('adds the displayName', async () => {
      const value = 'new displayName';
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape, displayName: value }) as AmfShapes.IApiScalarShape;
      assert.equal(result.displayName, value);
    });

    it('adds the description', async () => {
      const value = 'new description';
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape, description: value }) as AmfShapes.IApiScalarShape;
      assert.equal(result.description, value);
    });

    it('adds the readOnly', async () => {
      const value = true;
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape, readOnly: value }) as AmfShapes.IApiScalarShape;
      assert.isTrue(result.readOnly);
    });

    it('adds the writeOnly', async () => {
      const value = true;
      const result = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape, writeOnly: value }) as AmfShapes.IApiScalarShape;
      assert.isTrue(result.writeOnly);
    });

    it('has the type in the graph', async () => {
      const created = await store.addType({ type: ns.aml.vocabularies.shapes.ScalarShape }) as AmfShapes.IApiScalarShape;
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
      const created = await StoreEvents.Type.add();
      const result = await store.getType(created!.id);
      assert.deepEqual(result, created);
    });
  });

  describe('getType()', () => {
    before(async () => {
      const demoApi = await AmfLoader.loadApi();
      await store.loadGraph(demoApi, 'RAML 1.0');
    });

    it('returns an object', async () => {
      const result = await AmfLoader.getShape(store, 'ErrorResource');
      assert.typeOf(result, 'object');
    });

    it('returns undefined when type not found', async () => {
      const result = await store.getType('unknown');
      assert.isUndefined(result);
    });

    it('reads the type from the event', async () => {
      const type = await AmfLoader.getShape(store, 'ErrorResource');
      const result = await StoreEvents.Type.get(type.id);
      assert.deepEqual(result, type);
    });

    it('serializes the default value string', async () => {
      const type = await AmfLoader.getShape(store, 'ErrorResource') as AmfShapes.IApiNodeShape;
      const [error] = type.properties;
      assert.equal(error.range!.defaultValueStr, 'true', 'has the default value string');
    });

    it('serializes the default value node', async () => {
      const type = await AmfLoader.getShape(store, 'ErrorResource') as AmfShapes.IApiNodeShape;
      const [error] = type.properties;
      const { defaultValue } = error.range!;
      assert.typeOf(defaultValue, 'object', 'the defaultValue is an object');
      assert.include(defaultValue!.types, ns.aml.vocabularies.data.Scalar, 'is a Scalar node');
      assert.typeOf(defaultValue!.name, 'string', 'has a name');
      const typed = defaultValue as AmfShapes.IApiScalarNode;
      assert.equal(typed.value, 'true', 'has the value');
      assert.equal(typed.dataType, ns.w3.xmlSchema.boolean, 'has the dataType');
    });

    // this is not set when the Editing pipeline is applied when processing API spec files.
    // it('has serialized inherits property', async () => {
    //   const type = await AmfLoader.getShape(store, 'AppPerson') as AmfShapes.IApiNodeShape;
    //   const { inherits } = type;
    //   assert.typeOf(inherits, 'array', 'inherits is an array');
    //   assert.lengthOf(inherits, 1, 'has one parent');
    //   const [inherit] = inherits;
    //   assert.typeOf(inherit, 'object', 'the inherit is an object');
    //   assert.include(inherit.types, ns.w3.shacl.NodeShape, 'has the NodeShape type');
    // });

    it('has the link name', async () => {
      const type = await AmfLoader.getShape(store, 'AppPerson') as AmfShapes.IApiNodeShape;
      assert.equal(type.name, 'AppPerson');
    });

    it('has the displayName', async () => {
      const type = await AmfLoader.getShape(store, 'AppPerson') as AmfShapes.IApiNodeShape;
      assert.equal(type.displayName, 'A person resource');
    });

    it('processes an ArrayShape', async () => {
      const result = await AmfLoader.getShape(store, 'Arrable') as AmfShapes.IApiArrayShape;
      assert.include(result.types, ns.aml.vocabularies.shapes.ArrayShape, 'has the ArrayShape type');
      assert.equal(result.name, 'Arrable', 'has the name');
      assert.deepEqual(result.examples, [], 'has empty examples');
      assert.deepEqual(result.values, [], 'has empty values');
      assert.deepEqual(result.inherits, [], 'has empty inherits');
      assert.deepEqual(result.or, [], 'has empty or');
      assert.deepEqual(result.and, [], 'has empty and');
      assert.deepEqual(result.xone, [], 'has empty xone');
      assert.deepEqual(result.customDomainProperties, [], 'has empty customDomainProperties');
      assert.typeOf(result.items, 'object', 'has the items');
      assert.include(result.items!.types, ns.w3.shacl.NodeShape, 'items has the NodeShape type');
    });

    it('processes a NodeShape', async () => {
      const result = await AmfLoader.getShape(store, 'AppPerson') as AmfShapes.IApiNodeShape;
      assert.include(result.types, ns.w3.shacl.NodeShape, 'has the NodeShape type');
      assert.equal(result.name, 'AppPerson', 'has the name');
      assert.typeOf(result.description, 'string', 'has the description');
      assert.lengthOf(result.examples, 1, 'has an example');
      assert.include(result.examples[0].types, ns.aml.vocabularies.apiContract.Example, 'example has the Example type');
      assert.deepEqual(result.values, [], 'has empty values');
      assert.deepEqual(result.inherits, [], 'has empty inherits');
      assert.deepEqual(result.or, [], 'has empty or');
      assert.deepEqual(result.and, [], 'has empty and');
      assert.deepEqual(result.xone, [], 'has empty xone');
      assert.deepEqual(result.customShapeProperties, [], 'has empty customShapeProperties');
      assert.deepEqual(result.customShapePropertyDefinitions, [], 'has empty customShapePropertyDefinitions');
      assert.deepEqual(result.dependencies, [], 'has empty dependencies');
      assert.deepEqual(result.customDomainProperties, [], 'has empty customDomainProperties');
      assert.isFalse(result.closed, 'has the closed');
      assert.typeOf(result.properties, 'array', 'has the properties');
      assert.isNotEmpty(result.properties, 'the properties is not empty');
    });

    it('processes an UnionShape', async () => {
      const result = await AmfLoader.getShape(store, 'Unionable') as AmfShapes.IApiUnionShape;
      assert.include(result.types, ns.aml.vocabularies.shapes.UnionShape, 'has the NodeShape type');
      assert.equal(result.name, 'Unionable', 'has the name');
      assert.isUndefined(result.description, 'has no description');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.deepEqual(result.values, [], 'has empty values');
      assert.deepEqual(result.inherits, [], 'has empty inherits');
      assert.deepEqual(result.or, [], 'has empty or');
      assert.deepEqual(result.and, [], 'has empty and');
      assert.deepEqual(result.xone, [], 'has empty xone');
      assert.deepEqual(result.customDomainProperties, [], 'has empty customDomainProperties');
      assert.typeOf(result.anyOf, 'array', 'has the anyOf');
      assert.lengthOf(result.anyOf, 2, 'has all anyOf');
      const [any1] = result.anyOf;
      assert.typeOf(any1.id, 'string', 'has the anyOf definition as Shape');
    });

    it('processes a ScalarShape', async () => {
      const result = await AmfLoader.getShape(store, 'Feature') as AmfShapes.IApiScalarShape;
      assert.include(result.types, ns.aml.vocabularies.shapes.ScalarShape, 'has the NodeShape type');
      assert.equal(result.name, 'Feature', 'has the name');
      assert.typeOf(result.description, 'string', 'has the description');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.deepEqual(result.inherits, [], 'has empty inherits');
      assert.deepEqual(result.or, [], 'has empty or');
      assert.deepEqual(result.and, [], 'has empty and');
      assert.deepEqual(result.xone, [], 'has empty xone');
      assert.deepEqual(result.customDomainProperties, [], 'has empty customDomainProperties');
      assert.equal(result.dataType, 'http://www.w3.org/2001/XMLSchema#string', 'has the dataType');
      assert.lengthOf(result.values, 3, 'has the values set');
    });

    it('processes a ScalarShape with enum values', async () => {
      const result = await AmfLoader.getShape(store, 'Feature') as AmfShapes.IApiScalarShape;
      const [v1, v2, v3] = result.values as AmfShapes.IApiScalarNode[];
      assert.include(v1.types, ns.aml.vocabularies.data.Scalar, 'v1 has the type');
      assert.include(v2.types, ns.aml.vocabularies.data.Scalar, 'v2 has the type');
      assert.include(v3.types, ns.aml.vocabularies.data.Scalar, 'v3 has the type');
      assert.equal(v1.name, 'scalar_1', 'v1 has the name');
      assert.equal(v2.name, 'scalar_2', 'v2 has the name');
      assert.equal(v3.name, 'scalar_3', 'v3 has the name');
      assert.equal(v1.value, 'A', 'v1 has the value');
      assert.equal(v2.value, 'B', 'v2 has the value');
      assert.equal(v3.value, 'C', 'v3 has the value');
      assert.equal(v1.dataType, ns.w3.xmlSchema.string, 'v1 has the dataType');
      assert.equal(v2.dataType, ns.w3.xmlSchema.string, 'v2 has the dataType');
      assert.equal(v3.dataType, ns.w3.xmlSchema.string, 'v3 has the dataType');
    });

    it('processes a FileShape with enum values', async () => {
      const result = await AmfLoader.getShape(store, 'MaFile') as AmfShapes.IApiFileShape;

      assert.include(result.types, ns.aml.vocabularies.shapes.FileShape, 'has the FileShape type');
      assert.equal(result.name, 'MaFile', 'has the name');
      assert.typeOf(result.description, 'string', 'has the description');
      assert.deepEqual(result.examples, [], 'has no examples');
      assert.deepEqual(result.inherits, [], 'has empty inherits');
      assert.deepEqual(result.or, [], 'has empty or');
      assert.deepEqual(result.and, [], 'has empty and');
      assert.deepEqual(result.xone, [], 'has empty xone');
      assert.deepEqual(result.values, [], 'has empty values');
      assert.deepEqual(result.customDomainProperties, [], 'has empty customDomainProperties');
      assert.deepEqual(result.fileTypes, ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'], 'has the fileTypes');
      assert.equal(result.minLength, 1, 'has the minLength set');
      assert.equal(result.maxLength, 10, 'has the maxLength set');
    });

    it('processes a RecursiveShape', async () => {
      const shape = await AmfLoader.getShape(store, 'RecursiveShape') as AmfShapes.IApiNodeShape;
      const item = shape.properties.find(i => i.name === 'relatedTo')!.range as AmfShapes.IApiNodeShape;
      const recursive = item.properties[1].range as AmfShapes.IApiRecursiveShape;
      
      assert.typeOf(recursive.id, 'string', 'has the id');
      assert.include(recursive.types, ns.aml.vocabularies.shapes.RecursiveShape, 'has the RecursiveShape type');
      assert.equal(recursive.name, 'relatedTo', 'has the name');
      assert.deepEqual(recursive.inherits, [], 'has empty inherits');
      assert.deepEqual(recursive.or, [], 'has empty or');
      assert.deepEqual(recursive.and, [], 'has empty and');
      assert.deepEqual(recursive.xone, [], 'has empty xone');
      assert.deepEqual(recursive.values, [], 'has empty values');
      assert.deepEqual(recursive.customDomainProperties, [], 'has empty customDomainProperties');
      assert.typeOf(recursive.fixPoint, 'string', 'has the fixPoint');
    });

    it('processes a custom domain properties', async () => {
      const result = await AmfLoader.getShape(store, 'RecursiveShape') as AmfShapes.IApiNodeShape;
      const { customDomainProperties: cdp } = result;
      assert.typeOf(cdp, 'array', 'has the properties');
      assert.lengthOf(cdp, 1, 'has a single property');
      const [item] = cdp;
      assert.typeOf(item.id, 'string', 'has the id');
      // assert.include(item.types, ns.aml.vocabularies.apiContract.DomainExtension, 'has the Scalar type');
      assert.equal(item.name, 'deprecated', 'has the name');
      // assert.typeOf(item.definedBy, 'object', 'has the definedBy');
      assert.typeOf(item.extension, 'object', 'has the extension');
      const extension = item.extension as AmfShapes.IApiScalarNode;
      assert.include(extension.types, ns.aml.vocabularies.data.Scalar, 'the extension is a Scalar data mode');
      assert.equal(extension.dataType, ns.w3.xmlSchema.string, 'the extension has the data type');
      assert.equal(extension.value, 'This type is deprecated causes it throws errors.', 'the extension has the value');
    });

    // AMF does not restore XML schemas
    it.skip('processes a SchemaShape', async () => {
      const expects = await AmfLoader.lookupRequest(store, '/xml', 'post');
      const [payload] = expects.payloads;
      const result = payload.schema as AmfShapes.IApiSchemaShape;
      assert.equal(result.mediaType, 'application/xml', 'has media type');
      assert.typeOf(result.raw, 'string', 'has raw');
      assert.typeOf(result.examples, 'array', 'has examples');
      assert.lengthOf(result.examples, 1, 'has single examples');
      const [ example ] = result.examples;
      assert.isTrue(example.strict, 'example.strict is set');
      assert.typeOf(example.value, 'string', 'example.value is set');
    });
  });

  describe('getTypes()', () => {
    let ids: string[];
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
      const result = await StoreEvents.Type.getBulk(ids);
      assert.typeOf(result, 'array', 'result is an array');
      assert.lengthOf(result!, 3, 'has all results');
    });
  });

  describe('deleteType()', () => {
    let id: string;
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
      await StoreEvents.Type.delete(id);
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
      let id: string;
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
        const result = (await store.updateTypeProperty(id, 'dataType', 'updated dataType')) as AmfShapes.IApiScalarShape;
        assert.equal(result.dataType, 'updated dataType', 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiScalarShape;
        assert.equal(stored.dataType, 'updated dataType', 'updated value is stored in the graph');
      });

      it('updates the pattern', async () => {
        const result = (await store.updateTypeProperty(id, 'pattern', 'updated pattern')) as AmfShapes.IApiScalarShape;
        assert.equal(result.pattern, 'updated pattern', 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiScalarShape;
        assert.equal(stored.pattern, 'updated pattern', 'updated value is stored in the graph');
      });

      it('updates the minLength', async () => {
        const result = (await store.updateTypeProperty(id, 'minLength', 1)) as AmfShapes.IApiScalarShape;
        assert.equal(result.minLength, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiScalarShape;
        assert.equal(stored.minLength, 1, 'updated value is stored in the graph');
      });

      it('updates the maxLength', async () => {
        const result = (await store.updateTypeProperty(id, 'maxLength', 1)) as AmfShapes.IApiScalarShape;
        assert.equal(result.maxLength, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiScalarShape;
        assert.equal(stored.maxLength, 1, 'updated value is stored in the graph');
      });

      it('updates the minimum', async () => {
        const result = (await store.updateTypeProperty(id, 'minimum', 1)) as AmfShapes.IApiScalarShape;
        assert.equal(result.minimum, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiScalarShape;
        assert.equal(stored.minimum, 1, 'updated value is stored in the graph');
      });

      it('updates the maximum', async () => {
        const result = (await store.updateTypeProperty(id, 'maximum', 1)) as AmfShapes.IApiScalarShape;
        assert.equal(result.maximum, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiScalarShape;
        assert.equal(stored.maximum, 1, 'updated value is stored in the graph');
      });

      it('updates the exclusiveMinimum', async () => {
        const result = (await store.updateTypeProperty(id, 'exclusiveMinimum', true)) as AmfShapes.IApiScalarShape;
        assert.isTrue(result.exclusiveMinimum, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiScalarShape;
        assert.isTrue(stored.exclusiveMinimum, 'updated value is stored in the graph');
      });

      it('updates the exclusiveMaximum', async () => {
        const result = (await store.updateTypeProperty(id, 'exclusiveMaximum', true)) as AmfShapes.IApiScalarShape;
        assert.isTrue(result.exclusiveMaximum, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiScalarShape;
        assert.isTrue(stored.exclusiveMaximum, 'updated value is stored in the graph');
      });

      it('updates the format', async () => {
        const result = (await store.updateTypeProperty(id, 'format', 'updated format')) as AmfShapes.IApiScalarShape;
        assert.equal(result.format, 'updated format', 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiScalarShape;
        assert.equal(stored.format, 'updated format', 'updated value is stored in the graph');
      });

      it('updates the multipleOf', async () => {
        const result = (await store.updateTypeProperty(id, 'multipleOf', 1)) as AmfShapes.IApiScalarShape;
        assert.equal(result.multipleOf, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiScalarShape;
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
      let id: string;
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
        const result = (await store.updateTypeProperty(id, 'minProperties', 1)) as AmfShapes.IApiNodeShape;
        assert.equal(result.minProperties, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiNodeShape;
        assert.equal(stored.minProperties, 1, 'updated value is stored in the graph');
      });

      it('updates the maxProperties', async () => {
        const result = (await store.updateTypeProperty(id, 'maxProperties', 1)) as AmfShapes.IApiNodeShape;
        assert.equal(result.maxProperties, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiNodeShape;
        assert.equal(stored.maxProperties, 1, 'updated value is stored in the graph');
      });

      it('updates the closed', async () => {
        const result = (await store.updateTypeProperty(id, 'closed', true)) as AmfShapes.IApiNodeShape;
        assert.equal(result.closed, true, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiNodeShape;
        assert.equal(stored.closed, true, 'updated value is stored in the graph');
      });

      it('updates the discriminator', async () => {
        const result = (await store.updateTypeProperty(id, 'discriminator', 'updated discriminator')) as AmfShapes.IApiNodeShape;
        assert.equal(result.discriminator, 'updated discriminator', 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiNodeShape;
        assert.equal(stored.discriminator, 'updated discriminator', 'updated value is stored in the graph');
      });

      it('updates the discriminatorValue', async () => {
        const result = (await store.updateTypeProperty(id, 'discriminatorValue', 'updated discriminatorValue')) as AmfShapes.IApiNodeShape;
        assert.equal(result.discriminatorValue, 'updated discriminatorValue', 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiNodeShape;
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
      let id: string;
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
      let id: string;
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
        const result = (await store.updateTypeProperty(id, 'fileTypes', ['json'])) as AmfShapes.IApiFileShape;
        assert.deepEqual(result.fileTypes, ['json'], 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiFileShape;
        assert.deepEqual(stored.fileTypes, ['json'], 'updated value is stored in the graph');
      });

      it('updates the pattern', async () => {
        const result = (await store.updateTypeProperty(id, 'pattern', 'updated pattern')) as AmfShapes.IApiFileShape;
        assert.equal(result.pattern, 'updated pattern', 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiFileShape;
        assert.equal(stored.pattern, 'updated pattern', 'updated value is stored in the graph');
      });

      it('updates the minLength', async () => {
        const result = (await store.updateTypeProperty(id, 'minLength', 1)) as AmfShapes.IApiFileShape;
        assert.equal(result.minLength, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiFileShape;
        assert.equal(stored.minLength, 1, 'updated value is stored in the graph');
      });

      it('updates the maxLength', async () => {
        const result = (await store.updateTypeProperty(id, 'maxLength', 1)) as AmfShapes.IApiFileShape;
        assert.equal(result.maxLength, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiFileShape;
        assert.equal(stored.maxLength, 1, 'updated value is stored in the graph');
      });

      it('updates the minimum', async () => {
        const result = (await store.updateTypeProperty(id, 'minimum', 1)) as AmfShapes.IApiFileShape;
        assert.equal(result.minimum, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiFileShape;
        assert.equal(stored.minimum, 1, 'updated value is stored in the graph');
      });

      it('updates the maximum', async () => {
        const result = (await store.updateTypeProperty(id, 'maximum', 1)) as AmfShapes.IApiFileShape;
        assert.equal(result.maximum, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiFileShape;
        assert.equal(stored.maximum, 1, 'updated value is stored in the graph');
      });

      it('updates the exclusiveMinimum', async () => {
        const result = (await store.updateTypeProperty(id, 'exclusiveMinimum', true)) as AmfShapes.IApiFileShape;
        assert.isTrue(result.exclusiveMinimum, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiFileShape;
        assert.isTrue(stored.exclusiveMinimum, 'updated value is stored in the graph');
      });

      it('updates the exclusiveMaximum', async () => {
        const result = (await store.updateTypeProperty(id, 'exclusiveMaximum', true)) as AmfShapes.IApiFileShape;
        assert.isTrue(result.exclusiveMaximum, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiFileShape;
        assert.isTrue(stored.exclusiveMaximum, 'updated value is stored in the graph');
      });

      it('updates the format', async () => {
        const result = (await store.updateTypeProperty(id, 'format', 'updated format')) as AmfShapes.IApiFileShape;
        assert.equal(result.format, 'updated format', 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiFileShape;
        assert.equal(stored.format, 'updated format', 'updated value is stored in the graph');
      });

      it('updates the multipleOf', async () => {
        const result = (await store.updateTypeProperty(id, 'multipleOf', 1)) as AmfShapes.IApiFileShape;
        assert.equal(result.multipleOf, 1, 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiFileShape;
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
      let id: string;
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
        const result = (await store.updateTypeProperty(id, 'mediaType', 'updated mediaType')) as AmfShapes.IApiSchemaShape;
        assert.equal(result.mediaType, 'updated mediaType', 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiSchemaShape;
        assert.equal(stored.mediaType, 'updated mediaType', 'updated value is stored in the graph');
      });

      it('updates the raw', async () => {
        const result = (await store.updateTypeProperty(id, 'raw', 'updated raw')) as AmfShapes.IApiSchemaShape;
        assert.equal(result.raw, 'updated raw', 'result has the updated value');
        const stored = (await store.getType(id)) as AmfShapes.IApiSchemaShape;
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
      let id: string;
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
      let id: string;
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
      let id: string;
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
      let id: string;
      beforeEach(async () => {
        await store.createWebApi();
        const created = await store.addType({ 
          type: ns.aml.vocabularies.shapes.ScalarShape,
          name: 'test name',
        });
        id = created.id;
      });

      it('updates a property from the event', async () => {
        await StoreEvents.Type.update(id, 'name', 'updated name');
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
    let typeId: string;
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
      const type = (await store.getType(typeId)) as AmfShapes.IApiNodeShape;
      const [p1, p2] = type.properties;
      assert.deepEqual(result1, p1, 'has the property #1');
      assert.deepEqual(result2, p2, 'has the property #2');
    });

    [
      'displayName', 'description', 'defaultValueStr', 
      // 'patternName', 
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
      assert.equal(result.range!.name, 'range name', 'has the passed init properties');
      const stored = await store.getPropertyShape(result.id);
      assert.equal(stored.range!.name, 'range name', 'stores the range');
    });

    it('throws when unknown type', async () => {
      let msg: string | undefined;
      try {
        await store.addPropertyShape('unknown', { name: 'test property' });
      } catch (e) {
        msg = e.message;
      }
      assert.equal(msg, 'No type for unknown');
    });

    it('throws when not a node type type', async () => {
      const type = await store.addType();
      let msg: string | undefined;
      try {
        await store.addPropertyShape(type.id, { name: 'test property' });
      } catch (e) {
        msg = e.message;
      }
      assert.equal(msg, 'Unable to add a property to a non Node shape.');
    });

    it('throws when no init object', async () => {
      let msg: string | undefined;
      const value = undefined as unknown as PropertyShapeInit;
      try {
        await store.addPropertyShape(typeId, value);
      } catch (e) {
        msg = e.message;
      }
      assert.equal(msg, 'Missing property initialization object.');
    });

    it('throws when no name in the init object', async () => {
      let msg: string | undefined;
      const value = { name: undefined } as unknown as PropertyShapeInit;
      try {
        await store.addPropertyShape(typeId, value);
      } catch (e) {
        msg = e.message;
      }
      assert.equal(msg, 'Missing property name.');
    });

    it('creates the property from the event', async () => {
      const created = await StoreEvents.Type.addProperty(typeId, { ...initBase });
      const stored = await StoreEvents.Type.getProperty(created!.id);
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
    let propertyId: string;
    let typeId: string;
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
      'name', 'description', 'defaultValueStr', 'displayName', 
      // 'patternName',
    ].forEach((prop) => {
      const property = prop as unknown as keyof AmfShapes.IApiPropertyShape<AmfShapes.IShapeUnion>;
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
      const property = prop as unknown as keyof AmfShapes.IApiPropertyShape<AmfShapes.IShapeUnion>;
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
      const property = prop as unknown as keyof AmfShapes.IApiPropertyShape<AmfShapes.IShapeUnion>;
      it(`updates the ${property}`, async () => {
        const result = await store.updatePropertyShapeProperty(typeId, propertyId, property, 5);
        assert.equal(result[property], 5, 'result has the updated property');
        const stored = await store.getPropertyShape(propertyId);
        assert.equal(stored[property], 5, 'updated value is stored in the graph');
      });
    });

    it('throws when unknown property', async () => {
      let msg: string | undefined;
      const value = 'unknown' as unknown as keyof AmfShapes.IApiPropertyShape<AmfShapes.IShapeUnion>;
      try {
        await store.updatePropertyShapeProperty(typeId, propertyId, value, 5);
      } catch (e) {
        msg = e.message;
      }
      assert.equal(msg, 'Unsupported patch property of PropertyShape: unknown');
    });

    it('updates the property from the event', async () => {
      await StoreEvents.Type.updateProperty(typeId, propertyId, 'deprecated', true);
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
    let propertyId: string;
    let typeId: string;
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
      const type = (await store.getType(typeId)) as AmfShapes.IApiNodeShape;
      assert.deepEqual(type.properties, []);
    });

    it('removes the selected property only', async () => {
      const other = await store.addPropertyShape(typeId, { name: 'other property' });
      await store.deletePropertyShape(typeId, propertyId);
      const type = (await store.getType(typeId)) as AmfShapes.IApiNodeShape;
      assert.deepEqual(type.properties, [other]);
    });

    it('removes the property from the event', async () => {
      await StoreEvents.Type.deleteProperty(propertyId, typeId);
      const type = (await store.getType(typeId)) as AmfShapes.IApiNodeShape;
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
