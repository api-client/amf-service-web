import { model } from 'amf-client-js';
import { ApiEndPointListItem, ApiCustomDomainProperty, ApiDocumentation, ApiEndPoint, ApiEndPointWithOperationsListItem, ApiExample, ApiInit, ApiNodeShapeListItem, ApiOperation, ApiOperationListItem, ApiParameter, ApiParametrizedSecurityScheme, ApiPayload, ApiRequest, ApiResponse, ApiSecurityRequirement, ApiSecurityScheme, ApiSecuritySchemeListItem, ApiServer, ApiServerInit, ApiTemplatedLink, EndPointInit, OperationInit, OperationRequestInit, SerializedApi } from './types';

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
   * @returns The domain id of the created document
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
   * @returns The domain id of the created server.
   */
  addServer(init: ApiServerInit): Promise<string>;

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
  addEndpoint(init: EndPointInit): Promise<string>;

  /**
   * Finds an endpoint by path or domain id.
   * @param pathOrId The domain id of the endpoint or its path.
   */
  findEndpoint(pathOrId: string): model.domain.EndPoint|undefined;

  /**
   * Removes endpoint from the API.
   * @param id The endpoint domain id.
   * @returns The id of the removed endpoint or undefined if the endpoint is not in the graph.
   */
  deleteEndpoint(id: string): Promise<string>;

  /**
   * Reads the information about an endpoint and returns it.
   * @param idOrPath The domain id of the endpoint or its path.
   */
  getEndpoint(idOrPath: string): Promise<ApiEndPoint>;

  /**
   * Updates a scalar property of an endpoint.
   * @param id The domain id of the operation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateEndpointProperty(id: string, property: string, value: unknown): Promise<void>;

  /**
   * Adds an empty operation to an endpoint.
   * @param pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param init The operation initialize options
   */
  addOperation(pathOrId: string, init: OperationInit): Promise<string>;

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
   * @returns The id of the removed operation or undefined if operation is not in the graph.
   */
  deleteOperation(id: string): Promise<string>;

  /**
   * Updates a scalar property of an operation.
   * @param id The domain id of the operation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateOperationProperty(id: string, property: string, value: unknown): Promise<void>;

  /**
   * @param operationId The operation domain id
   * @param init The request init options. Optional.
   * @returns The domain id of the created request
   */
  addRequest(operationId: string, init?: OperationRequestInit): Promise<string>;

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
   * Lists the type (schema) definitions for the API.
   */
  listTypes(): Promise<ApiNodeShapeListItem[]>;

  /**
   * Lists the security definitions for the API.
   */
  listSecurity(): Promise<ApiSecuritySchemeListItem[]>;
}
