import { model } from 'amf-client-js';
import { ApiEndPointListItem, ApiCustomDomainProperty, ApiDocumentation, ApiEndPoint, ApiEndPointWithOperationsListItem, ApiExample, ApiInit, ApiNodeShapeListItem, ApiOperation, ApiOperationListItem, ApiParameter, ApiParametrizedSecurityScheme, ApiPayload, ApiRequest, ApiResponse, ApiSecurityRequirement, ApiSecurityScheme, ApiSecuritySchemeListItem, ApiServer, ApiServerInit, ApiTemplatedLink, EndPointInit, OperationInit, OperationRequestInit, SerializedApi, OperationResponseInit, DocumentationInit, ApiNodeShape, ApiShapeUnion, ShapeInit } from './types';

export declare class AmfService {
  graph?: model.document.Document;
  constructor();

  /**
   * Loads existing API model into to graph as Document.
   */
  loadGraph(model: string): Promise<void>;

  /**
   * Creates new Document in the graph.
   * @param init Api init options
   * @returns The domain id of the created WebAPI
   */
  createWebApi(init?: ApiInit): Promise<string>;

  /**
   * Reads the WebApi property.
   */
  webApi(): model.domain.WebApi;
  
  /**
   * Reads basic info about the API.
   */
  getApi(): Promise<SerializedApi>;

  /**
   * @returns List of servers in this API.
   */
  listServers(): Promise<ApiServer[]>;

  /**
   * Adds a server definition to the API.
   * @param init 
   * @returns The instance of the created server
   */
  addServer(init: ApiServerInit): Promise<ApiServer>;

  /**
   * Reads the Server definition from the graph.
   * @param id The domain id of the Server to read
   */
  getServer(id: string): Promise<ApiServer>;

  /**
   * List all endpoints in the API.
   */
  listEndpoints(): Promise<ApiEndPointListItem[]>;

  /**
   * Lists all endpoints with operations included into the result.
   */
  listEndpointsWithOperations(): Promise<ApiEndPointWithOperationsListItem[]>;

  /**
   * Adds a new endpoint to the API and returns it.
   * @param init EndPoint init parameters
   */
  addEndpoint(init: EndPointInit): Promise<ApiEndPoint>;

  /**
   * Finds an endpoint by path or domain id.
   * @param pathOrId The domain id of the endpoint or its path.
   */
  findEndpoint(pathOrId: string): model.domain.EndPoint|undefined;

  /**
   * Removes endpoint from the API.
   * @param id The endpoint domain id.
   */
  deleteEndpoint(id: string): Promise<void>;

  /**
   * Reads the information about an endpoint and returns it.
   * @param idOrPath The domain id of the endpoint or its path.
   */
  getEndpoint(idOrPath: string): Promise<ApiEndPoint>;

  /**
   * Updates a scalar property of an endpoint.
   * @param id The domain id of the endpoint.
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateEndpointProperty(id: string, property: string, value: unknown): Promise<ApiEndPoint>;

  /**
   * Adds an empty operation to an endpoint.
   * @param pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param init The operation initialize options
   */
  addOperation(pathOrId: string, init: OperationInit): Promise<ApiOperation>;

  /**
   * Searches for an operation in the API.
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  findOperation(methodOrId: string, pathOrId?: string): model.domain.Operation|undefined;

  /**
   * Reads the operation model.
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  getOperation(methodOrId?: string, pathOrId?: string): Promise<ApiOperation>;

  /**
   * Lists all operations in an endpoint.
   * @param pathOrId The domain id of the endpoint to list operations from or its path.
   */
  listOperations(pathOrId: string): Promise<ApiOperationListItem[]>;

  /**
   * Removes an operation from the graph.
   * @param id The operation id to remove.
   * @returns The id of the affected endpoint. Undefined when operation or endpoint cannot be found.
   */
  deleteOperation(id: string): Promise<string>;

  /**
   * Finds the parent endpoint for the operation
   * @param id The id of the operation
   */
  findOperationParent(id: string): model.domain.EndPoint|undefined;

  /**
   * Updates a scalar property of an operation.
   * @param id The domain id of the operation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateOperationProperty(id: string, property: string, value: unknown): Promise<ApiOperation>;

  /**
   * @param operationId The operation domain id
   * @param init The request init options. Optional.
   * @returns The domain id of the created request
   */
  addRequest(operationId: string, init?: OperationRequestInit): Promise<string>;

  /**
   * @param operationId The operation domain id
   * @param init The response init options.
   * @returns The domain id of the created response
   */
  addResponse(operationId: string, init?: OperationResponseInit): Promise<string>;

  /**
   * Reads the info about a parameter.
   * @param id The domain id of the parameter
   */
  getParameter(id: string): Promise<ApiParameter>;

  /**
   * Reads example value from the store.
   * @param id The id of the example to read.
   */
  getExample(id: string): Promise<ApiExample>;

  /**
   * Reads Payload data from the graph
   * @param id The domain id of the payload
   */
  getPayload(id: string): Promise<ApiPayload>;

  /**
   * Reads the response data from the graph.
   * @param id The domain id of the response.
   */
  getResponse(id: string): Promise<ApiResponse>;

  /**
   * Reads the TemplatedLink object from the graph.
   * @param id The domain id of the TemplatedLink
   */
  getTemplatedLink(id: string): Promise<ApiTemplatedLink>;

  /**
   * Reads the SecurityRequirement object from the graph.
   * @param id The domain id of the SecurityRequirement
   */
  getSecurityRequirement(id: string): Promise<ApiSecurityRequirement>;

  /**
   * Reads the ParametrizedSecurityScheme object from the graph.
   * @param id The domain id of the ParametrizedSecurityScheme
   */
  getParametrizedSecurityScheme(id: string): Promise<ApiParametrizedSecurityScheme>;

  /**
   * Reads the SecurityScheme object from the graph.
   * @param id The domain id of the SecurityScheme
   */
  getSecurityScheme(id: string): Promise<ApiSecurityScheme>;

  /**
   * Reads the CustomDomainProperty object from the graph.
   * @param id The domain id of the CustomDomainProperty
   */
  getCustomDomainProperty(id: string): Promise<ApiCustomDomainProperty>;

  /**
   * Reads the Request object from the graph.
   * @param id The domain id of the Request
   */
  getRequest(id: string): Promise<ApiRequest>;

  /**
   * Lists the documentation definitions for the API.
   */
  listDocumentations(): Promise<ApiDocumentation[]>;

  /**
   * Adds a new documentation object to the graph.
   * @param init The initialization properties
   * @returns The created documentation.
   */
  addDocumentation(init: DocumentationInit): Promise<ApiDocumentation>;

  /**
   * Reads the documentation object from the store.
   * @param id The domain id of the documentation object
   * @returns The read documentation.
   */
  getDocumentation(id: string): Promise<ApiDocumentation|undefined>;

  /**
   * Updates a scalar property of a documentation.
   * @param id The domain id of the documentation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateDocumentationProperty(id: string, property: string, value: any): Promise<ApiDocumentation>;

  /**
   * Removes the documentation from the graph.
   * @param id The domain id of the documentation object
   */
  deleteDocumentation(id: string): Promise<void>;

  /**
   * Lists the type (schema) definitions for the API.
   */
  listTypes(): Promise<ApiNodeShapeListItem[]>;
  /**
   * 
   * @param id The domain id of the API type (schema).
   */
  getType(id: string): Promise<ApiShapeUnion>;

  /**
   * Creates a new type in the API.
   * @param init The Shape init options.
   */
  addType(init?: ShapeInit): Promise<ApiShapeUnion>;

  /**
   * Removes a type for a given domain id.
   * @param id The type domain id.
   * @returns True when the type has been found and removed.
   */
  deleteType(id: string): Promise<boolean>;

  /**
   * Updates a scalar property of a type.
   * @param id The domain id of the type.
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateTypeProperty(id: string, property: string, value: any): Promise<ApiShapeUnion>;

  /**
   * Updates a scalar property of a scalar type.
   * @param shape The domain id of the type.
   * @param property The property name to update
   * @param  value The new value to set.
   * @returns `true` when the shape has been updated.
   */
  updateAnyShapeProperty(shape: model.domain.AnyShape, property: string, value: any): boolean;

  /**
   * Updates a scalar property of a scalar type.
   * @param scalar The shape to update
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateScalarShapeProperty(scalar: model.domain.ScalarShape, property: string, value: any): void;

  /**
   * Updates a scalar property of a Node type.
   * @param shape The shape to update
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateNodeShapeProperty(shape: model.domain.NodeShape, property: string, value: any): void;

  /**
   * Updates a scalar property of a file type.
   * @param shape The shape to update
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateFileShapeProperty(shape: model.domain.FileShape, property: string, value: any): void;

  /**
   * Updates a scalar property of a schema type.
   * @param shape The shape to update
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateSchemaShapeProperty(shape: model.domain.SchemaShape, property: string, value: any): void;

  /**
   * Updates a scalar property of a tuple type.
   * @param shape The shape to update
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateTupleShapeProperty(shape: model.domain.TupleShape, property: string, value: any): void;

  /**
   * Lists the security definitions for the API.
   */
  listSecurity(): Promise<ApiSecuritySchemeListItem[]>;
}
