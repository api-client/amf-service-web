import { WorkerResponse, WorkerQueueItem, ApiEndPointListItem, ApiCustomDomainProperty, ApiDocumentation, ApiEndPoint, ApiEndPointWithOperationsListItem, ApiExample, ApiInit, ApiNodeShapeListItem, ApiOperation, ApiOperationListItem, ApiParameter, ApiParametrizedSecurityScheme, ApiPayload, ApiRequest, ApiResponse, ApiSecurityRequirement, ApiSecurityScheme, ApiSecuritySchemeListItem, ApiServer, ApiServerInit, ApiTemplatedLink, EndPointInit, OperationInit, OperationRequestInit, SerializedApi } from './types';

export declare const workerValue: unique symbol;
export declare const nextIdValue: unique symbol;
export declare const queueValue: unique symbol;
export declare const createResponsePromise: unique symbol;
export declare const sendMessage: unique symbol;
export declare const getId: unique symbol;
export declare const createWorker: unique symbol;
export declare const responseHandler: unique symbol;
export declare const processResponse: unique symbol;
export declare const errorHandler: unique symbol;
export declare const readWorkerUrl: unique symbol;

/**
 * A proxy class that creates a web worker AMF store in it and
 * relays function calls to the store worker.
 *
 * This class provides a framework for workers but has no implementation details of what
 * the worker is so the following methods and getters has to be implemented in the child classes:
 *
 * - #worker
 * - [workerValue] -> #worker
 * - [createWorker]
 * - [readWorkerUrl]
 * - [sendMessage](type, ...args)
 */
export declare class AmfStoreProxy {
  /**
   * The instance of the worker.
   */
  get worker(): any;
  [workerValue]: any;
  [nextIdValue]: number;
  [queueValue]: Map<number, WorkerQueueItem>;

  constructor();

  /**
   * Initializes the backend store.
   */
  init(): Promise<void>;

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

  /**
   * @returns The ID of the message, unique per call.
   */
  [getId](): number;

  /**
   * Creates an instance of the web worker.
   */
  [createWorker](): any;

  /**
   * The worker location in the final build of the app may be anywhere.
   */
  [readWorkerUrl](): string;

  [responseHandler](e: MessageEvent): any;

  /**
   * A function that processes the response from the worker process
   */
  [processResponse](data: WorkerResponse): any;

  [errorHandler](): Error;

  /**
   * Creates a promise returned by all action functions and adds it to the queue.
   * @param {number} id The id of the message.
   */
  [createResponsePromise](id: number): Promise<unknown>;

  /**
   * Sends a message to the worker.
   * @param type The type of the message
   * @param args A list of optional arguments.
   */
  [sendMessage](type: string, ...args: any[]): any;
}
