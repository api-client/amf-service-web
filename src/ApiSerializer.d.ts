import AMF from 'amf-client-js';
import { ApiAnyShape, ApiArrayNode, ApiArrayShape, ApiCallback, ApiCustomDomainProperty, ApiCustomDomainPropertyListItem, ApiDataArrangeShape, ApiDataNode, ApiDocumentation, ApiDomainExtension, ApiEncoding, ApiEncodingRecursive, ApiEndPoint, ApiEndPointListItem, ApiEndPointWithOperationsListItem, ApiExample, ApiFileShape, ApiIriTemplateMapping, ApiNodeShape, ApiNodeShapeListItem, ApiObjectNode, ApiOperation, ApiOperationListItem, ApiOperationRecursive, ApiParameter, ApiParameterRecursive, ApiParametrizedSecurityScheme, ApiParametrizedSecuritySchemeRecursive, ApiPayload, ApiPayloadRecursive, ApiPropertyShape, ApiRequest, ApiRequestRecursive, ApiResponse, ApiResponseRecursive, ApiScalarNode, ApiScalarShape, ApiSchemaShape, ApiSecurityApiKeySettings, ApiSecurityHttpSettings, ApiSecurityOAuth1Settings, ApiSecurityOAuth2Flow, ApiSecurityOAuth2Settings, ApiSecurityOpenIdConnectSettings, ApiSecurityRequirement, ApiSecurityRequirementRecursive, ApiSecurityScheme, ApiSecuritySchemeListItem, ApiSecuritySchemeRecursive, ApiSecurityScope, ApiSecuritySettings, ApiSecuritySettingsUnion, ApiServer, ApiServerRecursive, ApiShape, ApiShapeUnion, ApiTemplatedLink, ApiTemplatedLinkRecursive, ApiTupleShape, ApiUnionShape, ApiXMLSerializer, SerializedApi } from "./types";

export declare class ApiSerializer {
  /**
   * @param {WebApi} object The ParametrizedSecurityScheme to serialize.
   * @returns {SerializedApi} Serialized ParametrizedSecurityScheme
   */
  static api(object: AMF.WebApi): SerializedApi;

  /**
   * @param object The ParametrizedSecurityScheme to serialize.
   * @returns Serialized ParametrizedSecurityScheme
   */
  static parametrizedSecurityScheme(object: AMF.ParametrizedSecurityScheme): ApiParametrizedSecurityScheme;

  /**
   * @param object The ParametrizedSecurityScheme to serialize.
   * @returns Serialized ParametrizedSecurityScheme
   */
  static parametrizedSecuritySchemeRecursive(object: AMF.ParametrizedSecurityScheme): ApiParametrizedSecuritySchemeRecursive;

  /**
   * @param object The ParametrizedSecurityScheme to serialize.
   * @returns Serialized ParametrizedSecurityScheme
   */
  static securityScheme(object: AMF.SecurityScheme): ApiSecurityScheme;
  /**
   * @param object The ParametrizedSecurityScheme to serialize.
   * @returns Serialized ParametrizedSecurityScheme
   */
  static securitySchemeRecursive(object: AMF.SecurityScheme): ApiSecuritySchemeRecursive;

  /**
   * @param object The SecurityRequirement to serialize.
   * @returns Serialized SecurityRequirement
   */
  static securityRequirement(object: AMF.SecurityRequirement): ApiSecurityRequirement;

  /**
   * @param object The SecurityRequirement to serialize.
   * @returns Serialized SecurityRequirement
   */
  static securityRequirementRecursive(object: AMF.SecurityRequirement): ApiSecurityRequirementRecursive;

  /**
   * @param object The SecurityScheme to serialize as a list item.
   * @returns Serialized SecurityScheme
   */
  static securitySchemeListItem(object: AMF.SecurityScheme): ApiSecuritySchemeListItem;
  
  static securitySettings(object: AMF.Settings): ApiSecuritySettingsUnion;

  static settings(object: AMF.Settings): ApiSecuritySettings;

  static oAuth1Settings(object: AMF.OAuth1Settings): ApiSecurityOAuth1Settings;

  static oAuth2Settings(object: AMF.OAuth2Settings): ApiSecurityOAuth2Settings;

  static oAuth2Flow(object: AMF.OAuth2Flow): ApiSecurityOAuth2Flow;

  static scope(object: AMF.Scope): ApiSecurityScope;

  static apiKeySettings(object: AMF.ApiKeySettings): ApiSecurityApiKeySettings;

  static httpSettings(object: AMF.HttpSettings): ApiSecurityHttpSettings;

  static openIdConnectSettings(object: AMF.OpenIdConnectSettings): ApiSecurityOpenIdConnectSettings;

  /**
   * @param object The ParametrizedSecurityScheme to serialize.
   * @returns Serialized ParametrizedSecurityScheme
   */
  static request(object: AMF.Request): ApiRequest;

  /**
   * @param object The ParametrizedSecurityScheme to serialize.
   * @returns Serialized ParametrizedSecurityScheme
   */
  static requestRecursive(object: AMF.Request): ApiRequestRecursive;

  /**
   * @param object The TemplatedLink to serialize.
   * @returns Serialized TemplatedLink
   */
  static templatedLink(object: AMF.TemplatedLink): ApiTemplatedLink;
  /**
   * @param object The TemplatedLink to serialize.
   * @returns Serialized TemplatedLink
   */
  static templatedLinkRecursive(object: AMF.TemplatedLink): ApiTemplatedLinkRecursive;
  static iriTemplateMapping(object: AMF.IriTemplateMapping): ApiIriTemplateMapping;

  /**
   * @param object The Response to serialize.
   * @returns Serialized Response
   */
  static response(object: AMF.Response): ApiResponse;

  /**
   * @param object The Response to serialize.
   * @returns Serialized Response
   */
  static responseRecursive(object: AMF.Response): ApiResponseRecursive;

  /**
   * @param object The Payload to serialize.
   * @returns Serialized Payload
   */
  static payload(object: AMF.Payload): ApiPayload;
  /**
   * @param object The Payload to serialize.
   * @returns Serialized Payload
   */
  static payloadRecursive(object: AMF.Payload): ApiPayloadRecursive;
  static encoding(object: AMF.Encoding): ApiEncoding;
  static encodingRecursive(object: AMF.Encoding): ApiEncodingRecursive;
  /**
   * @param object The Example to serialize.
   * @returns Serialized Example
   */
  static example(object: AMF.Example): ApiExample;
  
  /**
   * @param object The Parameter to serialize.
   * @returns Serialized Parameter
   */
  static parameter(object: AMF.Parameter): ApiParameter;
  /**
   * @param object The Parameter to serialize.
   * @returns Serialized Parameter
   */
  static parameterRecursive(object: AMF.Parameter): ApiParameterRecursive;
  
  /**
   * @param object The Operation to serialize.
   * @returns Serialized Operation
   */
  static operation(object: AMF.Operation): ApiOperation;
  /**
   * @param object The Operation to serialize.
   * @returns Serialized Operation
   */
  static operationRecursive(object: AMF.Operation): ApiOperationRecursive;
  static callback(object: AMF.Callback): ApiCallback;
  /**
   * @param object The EndPoint to serialize.
   * @returns Serialized EndPoint
   */
  static endPoint(object: AMF.EndPoint): ApiEndPoint;
  
  /**
   * @param object The EndPoint to serialize as a list item.
   * @returns Serialized EndPoint as a list item.
   */
  static endPointListItem(object: AMF.EndPoint): ApiEndPointListItem;

  /**
   * @param object The EndPoint to serialize as a list item.
   * @returns Serialized EndPoint as a list item.
   */
  static endPointWithOperationsListItem(object: AMF.EndPoint): ApiEndPointWithOperationsListItem;

  /**
   * @param object The Operation to serialize as a list item.
   * @returns Serialized Operation as a list item.
   */
  static operationListItem(object: AMF.Operation): ApiOperationListItem;
  
  /**
   * @param object The Server to serialize.
   * @returns Serialized Server
   */
  static server(object: AMF.Server): ApiServer;
  /**
   * @param object The Server to serialize.
   * @returns Serialized Server
   */
  static serverRecursive(object: AMF.Server): ApiServerRecursive;
  
  /**
   * @param object The CreativeWork to serialize.
   * @returns Serialized CreativeWork
   */
  static documentation(object: AMF.CreativeWork): ApiDocumentation;

  /**
   * @param object The NodeShape to serialize.
   * @returns Serialized NodeShape
   */
  static nodeShapeListItem(object: AMF.NodeShape): ApiNodeShapeListItem;
  static unknownShape(object: AMF.Shape): ApiShapeUnion;
  /**
   * @param object The NodeShape to serialize
   */
  static nodeShape(object: AMF.NodeShape): ApiNodeShape;
  static propertyShape(object: AMF.PropertyShape): ApiPropertyShape;
  static shape(object: AMF.Shape): ApiShape;
  static anyShape(object: AMF.AnyShape): ApiAnyShape;
  static xmlSerializer(object: AMF.XMLSerializer): ApiXMLSerializer;
  static scalarShape(object: AMF.ScalarShape): ApiScalarShape;
  static unionShape(object: AMF.UnionShape): ApiUnionShape;
  static fileShape(object: AMF.FileShape): ApiFileShape;
  static schemaShape(object: AMF.SchemaShape):ApiSchemaShape;
  static dataArrangeShape(object: AMF.DataArrangeShape): ApiDataArrangeShape;
  static arrayShape(object: AMF.ArrayShape): ApiArrayShape;
  static tupleShape(object: AMF.TupleShape): ApiTupleShape;
  static unknownDataNode(object: AMF.DataNode): ApiScalarNode|ApiObjectNode|ApiArrayNode|undefined;
  static dataNode(object: AMF.DataNode): ApiDataNode;
  static scalarNode(object: AMF.ScalarNode): ApiScalarNode;
  static objectNode(object: AMF.ObjectNode): ApiObjectNode;
  static arrayNode(object: AMF.ArrayNode): ApiArrayNode;  
  static domainPropertyListItem(object: AMF.CustomDomainProperty): ApiCustomDomainPropertyListItem;
  static customDomainProperty(object: AMF.CustomDomainProperty): ApiCustomDomainProperty;
  static domainExtension(object: AMF.DomainExtension): ApiDomainExtension;
}
