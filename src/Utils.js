/* eslint-disable no-param-reassign */

import { ns } from "./Namespace.js";

/**
   * @param {string[]} types 
   * @returns {boolean} true when the passed list of AMF types is a Shape.
   */
export function isShape(types) {
  const shapeTypes = [
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
  ];
  return types.some(t => shapeTypes.includes(t));
}
