import { model } from 'amf-client-js';
import { ApiAnyShape, ApiArrayNode, ApiArrayShape, ApiDataArrangeShape, ApiDataNode, ApiDocumentation, ApiEndPoint, ApiEndPointListItem, ApiEndPointWithOperationsListItem, ApiExample, ApiFileShape, ApiNodeShape, ApiNodeShapeListItem, ApiObjectNode, ApiOperation, ApiOperationListItem, ApiParameter, ApiParametrizedSecurityScheme, ApiPayload, ApiPropertyShape, ApiRequest, ApiResponse, ApiScalarNode, ApiScalarShape, ApiSchemaShape, ApiSecurityRequirement, ApiSecurityScheme, ApiSecuritySchemeListItem, ApiServer, ApiShape, ApiShapeUnion, ApiTemplatedLink, ApiTupleShape, ApiUnionShape, ApiXMLSerializer, SerializedApi } from "./types";

export declare class ApiSerializer {
  /**
   * @param {WebApi} object The ParametrizedSecurityScheme to serialize.
   * @returns {SerializedApi} Serialized ParametrizedSecurityScheme
   */
  static api(object: model.domain.WebApi): SerializedApi;

  /**
   * @param object The ParametrizedSecurityScheme to serialize.
   * @returns Serialized ParametrizedSecurityScheme
   */
  static parametrizedSecurityScheme(object: model.domain.ParametrizedSecurityScheme): ApiParametrizedSecurityScheme;

  /**
   * @param object The ParametrizedSecurityScheme to serialize.
   * @returns Serialized ParametrizedSecurityScheme
   */
  static securityScheme(object: model.domain.SecurityScheme): ApiSecurityScheme;

  /**
   * @param object The SecurityRequirement to serialize.
   * @returns Serialized SecurityRequirement
   */
  static securityRequirement(object: model.domain.SecurityRequirement): ApiSecurityRequirement;

  /**
   * @param object The SecurityScheme to serialize as a list item.
   * @returns Serialized SecurityScheme
   */
  static securitySchemeListItem(object: model.domain.SecurityScheme): ApiSecuritySchemeListItem;


  /**
   * @param object The ParametrizedSecurityScheme to serialize.
   * @returns Serialized ParametrizedSecurityScheme
   */
  static request(object: model.domain.Request): ApiRequest;

  /**
   * @param object The TemplatedLink to serialize.
   * @returns Serialized TemplatedLink
   */
  static templatedLink(object: model.domain.TemplatedLink): ApiTemplatedLink;

  /**
   * @param object The Response to serialize.
   * @returns Serialized Response
   */
  static response(object: model.domain.Response): ApiResponse;

  /**
   * @param object The Payload to serialize.
   * @returns Serialized Payload
   */
  static payload(object: model.domain.Payload): ApiPayload;

  /**
   * @param object The Example to serialize.
   * @returns Serialized Example
   */
  static example(object: model.domain.Example): ApiExample;
  
  /**
   * @param object The Parameter to serialize.
   * @returns Serialized Parameter
   */
  static parameter(object: model.domain.Parameter): ApiParameter;
  
  /**
   * @param object The Operation to serialize.
   * @returns Serialized Operation
   */
  static operation(object: model.domain.Operation): ApiOperation;
  
  /**
   * @param object The EndPoint to serialize.
   * @returns Serialized EndPoint
   */
  static endPoint(object: model.domain.EndPoint): ApiEndPoint;
  
  /**
   * @param object The EndPoint to serialize as a list item.
   * @returns Serialized EndPoint as a list item.
   */
  static endPointListItem(object: model.domain.EndPoint): ApiEndPointListItem;

  /**
   * @param object The EndPoint to serialize as a list item.
   * @returns Serialized EndPoint as a list item.
   */
  static endPointWithOperationsListItem(object: model.domain.EndPoint): ApiEndPointWithOperationsListItem;

  /**
   * @param object The Operation to serialize as a list item.
   * @returns Serialized Operation as a list item.
   */
  static operationListItem(object: model.domain.Operation): ApiOperationListItem;
  
  /**
   * @param object The Server to serialize.
   * @returns Serialized Server
   */
  static server(object: model.domain.Server): ApiServer;
  
  /**
   * @param object The CreativeWork to serialize.
   * @returns Serialized CreativeWork
   */
  static documentation(object: model.domain.CreativeWork): ApiDocumentation;

  /**
   * @param object The NodeShape to serialize.
   * @returns Serialized NodeShape
   */
  static nodeShapeListItem(object: model.domain.NodeShape): ApiNodeShapeListItem;
  static unknownShape(object: model.domain.Shape): ApiShapeUnion;
  /**
   * @param object The NodeShape to serialize
   */
  static nodeShape(object: model.domain.NodeShape): ApiNodeShape;
  static propertyShape(object: model.domain.PropertyShape): ApiPropertyShape;
  static shape(object: model.domain.Shape): ApiShape;
  static anyShape(object: model.domain.AnyShape): ApiAnyShape;
  static xmlSerializer(object: model.domain.XMLSerializer): ApiXMLSerializer;
  static scalarShape(object: model.domain.ScalarShape): ApiScalarShape;
  static unionShape(object: model.domain.UnionShape): ApiUnionShape;
  static fileShape(object: model.domain.FileShape): ApiFileShape;
  static schemaShape(object: model.domain.SchemaShape):ApiSchemaShape;
  static dataArrangeShape(object: model.domain.DataArrangeShape): ApiDataArrangeShape;
  static arrayShape(object: model.domain.ArrayShape): ApiArrayShape;
  static tupleShape(object: model.domain.TupleShape): ApiTupleShape;
  static unknownDataNode(object: model.domain.DataNode): ApiScalarNode|ApiObjectNode|ApiArrayNode|undefined;
  static dataNode(object: model.domain.DataNode): ApiDataNode;
  static scalarNode(object: model.domain.ScalarNode): ApiScalarNode;
  static objectNode(object: model.domain.ObjectNode): ApiObjectNode;
  static arrayNode(object: model.domain.ArrayNode): ApiArrayNode;
}
