import { assert } from '@open-wc/testing';
import { AmfNamespace as ns } from "@api-client/core/build/esm/browser.js";
import { isShape } from '../../src/Utils.js';

describe('Utils', () => {
  describe('isShape()', () => {
    [
      ns.w3.shacl.NodeShape,
      ns.aml.vocabularies.shapes.ScalarShape,
      ns.aml.vocabularies.shapes.ArrayShape,
      ns.aml.vocabularies.shapes.ArrayShape,
      ns.aml.vocabularies.shapes.NilShape,
      ns.aml.vocabularies.shapes.FileShape,
      ns.aml.vocabularies.shapes.UnionShape,
      ns.aml.vocabularies.shapes.TupleShape,
      ns.aml.vocabularies.shapes.SchemaShape,
      ns.aml.vocabularies.shapes.RecursiveShape,
      ns.aml.vocabularies.shapes.NilShape,
      ns.aml.vocabularies.shapes.MatrixShape,
    ].forEach((type) => {
      it(`returns true for ${type}`, () => {
        const types = [type, ns.aml.vocabularies.document.DomainElement];
        const result = isShape(types);
        assert.isTrue(result);
      });
    });

    it(`returns false for other shapes`, () => {
      const types = [ns.aml.vocabularies.document.DomainElement];
      const result = isShape(types);
      assert.isFalse(result);
    });
  });
});
