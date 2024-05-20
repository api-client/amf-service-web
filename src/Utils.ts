import { AmfNamespace } from "@api-client/core";

/**
 * @returns true when the passed list of AMF types is a Shape.
 */
export function isShape(types: string[]): boolean {
  const shapeTypes = [
    AmfNamespace.w3.shacl.NodeShape,
    AmfNamespace.aml.vocabularies.shapes.ScalarShape,
    AmfNamespace.aml.vocabularies.shapes.ArrayShape,
    AmfNamespace.aml.vocabularies.shapes.ArrayShape,
    AmfNamespace.aml.vocabularies.shapes.NilShape,
    AmfNamespace.aml.vocabularies.shapes.FileShape,
    AmfNamespace.aml.vocabularies.shapes.UnionShape,
    AmfNamespace.aml.vocabularies.shapes.TupleShape,
    AmfNamespace.aml.vocabularies.shapes.SchemaShape,
    AmfNamespace.aml.vocabularies.shapes.RecursiveShape,
    AmfNamespace.aml.vocabularies.shapes.NilShape,
    AmfNamespace.aml.vocabularies.shapes.MatrixShape,
  ];
  return types.some(t => shapeTypes.includes(t));
}
