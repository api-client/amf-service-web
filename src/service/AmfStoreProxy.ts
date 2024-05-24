/* eslint-disable @typescript-eslint/no-unused-vars */
import { AmfShapes, ApiDefinitions, AmfBase } from "@api-client/core/build/esm/browser.js";
import { ApiCustomDomainExtensionListItem, ApiInit, ApiNodeShapeListItem, ApiResource, ApiServerInit, CustomDomainPropertyInit, DocumentationInit, EndPointInit, ExampleInit, OperationInit, OperationRequestInit, OperationResponseInit, ParameterInit, ParserMediaTypes, ParserVendors, PayloadInit, PropertyShapeInit, ShapeInit, WorkerQueueItem, WorkerResponse } from "../types.js";

export const workerValue = Symbol("workerValue");
export const nextIdValue = Symbol("nextIdValue");
export const queueValue = Symbol("queueValue");
export const createResponsePromise = Symbol("createResponsePromise");
export const sendMessage = Symbol("sendMessage");
export const getId = Symbol("getId");
export const createWorker = Symbol("createWorker");
export const responseHandler = Symbol("responseHandler");
export const processResponse = Symbol("processResponse");
export const errorHandler = Symbol("errorHandler");
export const readWorkerUrl = Symbol("readWorkerUrl");

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
export class AmfStoreProxy {
  get worker(): unknown | null {
    return null;
  }

  [workerValue]?: unknown;

  [nextIdValue]: number = 0;

  [queueValue]: Map<number, WorkerQueueItem> = new Map<number, WorkerQueueItem>();

  constructor() {
    this[responseHandler] = this[responseHandler].bind(this);
    this[errorHandler] = this[errorHandler].bind(this);
  }

  /**
   * Initializes the backend store.
   */
  async init(): Promise<void> {
    return this[sendMessage]('init') as Promise<void>;
  }

  /**
   * Loads an API project into the store.
   * @param contents The list of files to process.
   * @param vendor The vendor of the API.
   * @param mediaType The API media type
   * @param main The name of the main API file.
   */
  async loadApi(contents: ApiResource[], vendor: ParserVendors, mediaType: ParserMediaTypes, main: string): Promise<void> {
    return this[sendMessage]('loadApi', contents, vendor, mediaType, main) as Promise<void>;
  }

  /**
   * Loads existing API model into to graph as Document.
   * @param vendor The parser type to use to parse the contents.
   */
  async loadGraph(model: string, vendor?: ParserVendors): Promise<void> {
    return this[sendMessage]('loadGraph', model, vendor) as Promise<void>;
  }

  /**
   * Creates new Document in the graph.
   * @param init Api init options
   * @returns The domain id of the created WebAPI
   */
  async createWebApi(init?: ApiInit): Promise<string> {
    return this[sendMessage]('createWebApi', init) as Promise<string>;
  }

  /**
   * Generates RAML api from the current graph.
   * RAML value for the API.
   */
  async generateRaml(): Promise<string> {
    return this[sendMessage]('generateRaml') as Promise<string>;
  }

  /**
   * Generates json+ld from the current graph.
   * JSON+ld value of the API.
   */
  async generateGraph(): Promise<string> {
    return this[sendMessage]('generateGraph') as Promise<string>;
  }

  /**
   * Checks whether an API is currently loaded.
   * @returns True when the API is loaded.
   */
  async hasApi(): Promise<boolean> {
    return this[sendMessage]('hasApi') as Promise<boolean>;
  }

  /**
   * Reads basic info about the API.
   */
  async getApi(): Promise<ApiDefinitions.IApiBase> {
    return this[sendMessage]('getApi') as Promise<ApiDefinitions.IApiBase>;
  }

  /**
   * @returns List of servers in this API.
   */
  async listServers(): Promise<ApiDefinitions.IApiServer[]> {
    return this[sendMessage]('listServers') as Promise<ApiDefinitions.IApiServer[]>;
  }

  /**
   * Adds a server definition to the API.
   * @returns The instance of the created server
   */
  async addServer(init: ApiServerInit): Promise<ApiDefinitions.IApiServer> {
    return this[sendMessage]('addServer', init) as Promise<ApiDefinitions.IApiServer>;
  }

  /**
   * Reads the Server definition from the graph.
   * @param id The domain id of the Server to read
   */
  async getServer(id: string): Promise<ApiDefinitions.IApiServer> {
    return this[sendMessage]('getServer', id) as Promise<ApiDefinitions.IApiServer>;
  }

  /**
   * List all endpoints in the API.
   */
  async listEndpoints(): Promise<ApiDefinitions.IApiEndPointListItem[]> {
    return this[sendMessage]('listEndpoints') as Promise<ApiDefinitions.IApiEndPointListItem[]>;
  }

  /**
   * Lists all endpoints with operations included into the result.
   */
  async listEndpointsWithOperations(): Promise<ApiDefinitions.IApiEndPointWithOperationsListItem[]> {
    return this[sendMessage]('listEndpointsWithOperations') as Promise<ApiDefinitions.IApiEndPointWithOperationsListItem[]>;
  }

  /**
   * Adds a new endpoint to the API and returns it.
   * @param init EndPoint init parameters
   */
  async addEndpoint(init: EndPointInit): Promise<ApiDefinitions.IApiEndPoint> {
    return this[sendMessage]('addEndpoint', init) as Promise<ApiDefinitions.IApiEndPoint>;
  }

  /**
   * Removes endpoint from the API.
   * @param id The endpoint domain id.
   */
  async deleteEndpoint(id: string): Promise<void> {
    await this[sendMessage]('deleteEndpoint', id) as Promise<void>;
  }

  /**
   * Reads the information about an endpoint and returns it.
   * @param idOrPath The domain id of the endpoint or its path.
   */
  async getEndpoint(idOrPath: string): Promise<ApiDefinitions.IApiEndPoint> {
    return this[sendMessage]('getEndpoint', idOrPath) as Promise<ApiDefinitions.IApiEndPoint>;
  }

  /**
   * Updates a scalar property of an endpoint.
   * @param id The domain id of the operation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  async updateEndpointProperty(id: string, property: keyof ApiDefinitions.IApiEndPoint, value: unknown): Promise<ApiDefinitions.IApiEndPoint> {
    return this[sendMessage]('updateEndpointProperty', id, property, value) as Promise<ApiDefinitions.IApiEndPoint>;
  }

  /**
   * Adds an empty operation to an endpoint.
   * @param pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param init The operation initialize options
   */
  async addOperation(pathOrId: string, init: OperationInit): Promise<ApiDefinitions.IApiOperation> {
    return this[sendMessage]('addOperation', pathOrId, init) as Promise<ApiDefinitions.IApiOperation>;
  }

  /**
   * Reads the operation model.
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  async getOperation(methodOrId: string, pathOrId?: string): Promise<ApiDefinitions.IApiOperation> {
    return this[sendMessage]('getOperation', methodOrId, pathOrId) as Promise<ApiDefinitions.IApiOperation>;
  }

  /**
   * Reads the operation model with all sub-models.
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   * @deprecated Remove all "recursive" operations.
   */
  async getOperationRecursive(methodOrId: string, pathOrId?: string): Promise<ApiDefinitions.IApiOperation> {
    return this[sendMessage]('getOperationRecursive', methodOrId, pathOrId) as Promise<ApiDefinitions.IApiOperation>;
  }

  /**
   * Lists all operations in an endpoint.
   * @param pathOrId The domain id of the endpoint to list operations from or its path.
   */
  async listOperations(pathOrId: string): Promise<ApiDefinitions.IApiOperationListItem[]> {
    return this[sendMessage]('listOperations', pathOrId) as Promise<ApiDefinitions.IApiOperationListItem[]>;
  }

  /**
   * Removes an operation from the graph.
   * @param id The operation id to remove.
   * @param endpointId The domain id of the parent endpoint.
   * @returns The id of the affected endpoint. Undefined when operation or endpoint cannot be found.
   */
  async deleteOperation(id: string, endpointId: string): Promise<string | undefined> {
    return this[sendMessage]('deleteOperation', id, endpointId) as Promise<string | undefined>;
  }

  /**
   * Finds an endpoint that has the operation.
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  async getOperationParent(methodOrId: string, pathOrId?: string): Promise<ApiDefinitions.IApiEndPoint | undefined> {
    return this[sendMessage]('getOperationParent', methodOrId, pathOrId) as Promise<ApiDefinitions.IApiEndPoint | undefined>;
  }

  /**
   * Updates a scalar property of an operation.
   * @param id The domain id of the operation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  async updateOperationProperty(id: string, property: keyof ApiDefinitions.IApiOperation, value: unknown): Promise<ApiDefinitions.IApiOperation> {
    return this[sendMessage]('updateOperationProperty', id, property, value) as Promise<ApiDefinitions.IApiOperation>;
  }

  /**
   * @param operationId The operation domain id
   * @param init The response init options.
   * @returns The domain id of the created response
   */
  async addResponse(operationId: string, init: OperationResponseInit): Promise<ApiDefinitions.IApiResponse> {
    return this[sendMessage]('addResponse', operationId, init) as Promise<ApiDefinitions.IApiResponse>;
  }

  /**
   * Reads the response data from the graph.
   * @param id The domain id of the response.
   */
  async getResponse(id: string): Promise<ApiDefinitions.IApiResponse> {
    return this[sendMessage]('getResponse', id) as Promise<ApiDefinitions.IApiResponse>;
  }

  /**
   * Reads the response data from the graph and returns the full serialized model.
   * @param id The domain id of the response.
   * @deprecated Remove all "recursive" operations.
   */
  async getResponseRecursive(id: string): Promise<ApiDefinitions.IApiResponse> {
    return this[sendMessage]('getResponseRecursive', id) as Promise<ApiDefinitions.IApiResponse>;
  }

  /**
   * Reads Response data in a bulk operation
   * @param ids The ids to read
   */
  async getResponses(ids: string[]): Promise<ApiDefinitions.IApiResponse[]> {
    return this[sendMessage]('getResponses', ids) as Promise<ApiDefinitions.IApiResponse[]>;
  }

  /**
   * Reads Response data in a bulk operation and returns the full serialized model.
   * @param ids The ids to read
   * @deprecated Remove all "recursive" operations.
   */
  async getResponsesRecursive(ids: string[]): Promise<ApiDefinitions.IApiResponse[]> {
    return this[sendMessage]('getResponsesRecursive', ids) as Promise<ApiDefinitions.IApiResponse[]>;
  }

  /**
   * Adds a header to the response.
   * @param responseId The response domain id
   * @param init The Parameter init options.
   */
  async addResponseHeader(responseId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    return this[sendMessage]('addResponseHeader', responseId, init) as Promise<ApiDefinitions.IApiParameter>;
  }

  /**
   * Removes a header from a response
   * @param responseId The response id to remove the header from
   * @param headerId The header id to remove.
   * @returns Updated response
   */
  async removeResponseHeader(responseId: string, headerId: string): Promise<ApiDefinitions.IApiResponse> {
    return this[sendMessage]('removeResponseHeader', responseId, headerId) as Promise<ApiDefinitions.IApiResponse>;
  }

  /**
   * Creates a new payload in the response.
   * @param responseId The response domain id
   * @param init The payload init options
   * @returns Created payload object.
   */
  async addResponsePayload(responseId: string, init: PayloadInit): Promise<ApiDefinitions.IApiPayload> {
    return this[sendMessage]('addResponsePayload', responseId, init) as Promise<ApiDefinitions.IApiPayload>;
  }

  /**
   * Removes a payload from a response object.
   * @param responseId The response domain id
   * @param payloadId The payload domain id.
   */
  async removeResponsePayload(responseId: string, payloadId: string): Promise<void> {
    return this[sendMessage]('removeResponsePayload', responseId, payloadId) as Promise<void>;
  }

  /**
   * Updates a scalar property of a Response.
   * @param id The domain id of the response.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated response
   */
  async updateResponseProperty(id: string, property: keyof ApiDefinitions.IApiResponse, value: unknown): Promise<ApiDefinitions.IApiResponse> {
    return this[sendMessage]('updateResponseProperty', id, property, value) as Promise<ApiDefinitions.IApiResponse>;
  }

  /**
   * @param responseId The response id to delete
   * @param operationId The id of the parent operation that has the response
   */
  async deleteResponse(responseId: string, operationId: string): Promise<void> {
    return this[sendMessage]('deleteResponse', responseId, operationId) as Promise<void>;
  }

  /**
   * Reads example value from the store.
   * @param id The id of the example to read.
   */
  async getExample(id: string): Promise<AmfShapes.IApiDataExample> {
    return this[sendMessage]('getExample', id) as Promise<AmfShapes.IApiDataExample>;
  }

  /**
   * Reads Example data in a bulk operation
   * @param ids The ids to read
   */
  async getExamples(ids: string[]): Promise<AmfShapes.IApiDataExample[]> {
    return this[sendMessage]('getExamples', ids) as Promise<AmfShapes.IApiDataExample[]>;
  }

  /**
   * Updates a scalar property of an Example.
   * @param id The domain id of the response.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated example
   */
  async updateExampleProperty(id: string, property: keyof AmfShapes.IApiDataExample, value: unknown): Promise<AmfShapes.IApiDataExample> {
    return this[sendMessage]('updateExampleProperty', id, property, value) as Promise<AmfShapes.IApiDataExample>;
  }

  /**
   * Reads Payload data from the graph
   * @param id The domain id of the payload
   */
  async getPayload(id: string): Promise<ApiDefinitions.IApiPayload> {
    return this[sendMessage]('getPayload', id) as Promise<ApiDefinitions.IApiPayload>;
  }

  /**
   * Reads Payload data from the graph and returns the full serialized model.
   * @param id The domain id of the payload
   * @deprecated Remove all "recursive" operations.
   */
  async getPayloadRecursive(id: string): Promise<ApiDefinitions.IApiPayload> {
    return this[sendMessage]('getPayloadRecursive', id) as Promise<ApiDefinitions.IApiPayload>;
  }

  /**
   * Reads Payload data in a bulk operation
   * @param ids The ids to read
   */
  async getPayloads(ids: string[]): Promise<ApiDefinitions.IApiPayload[]> {
    return this[sendMessage]('getPayloads', ids) as Promise<ApiDefinitions.IApiPayload[]>;
  }

  /**
   * Reads Payload data in a bulk operation and returns the full serialized model.
   * @param ids The ids to read
   * @deprecated Remove all "recursive" operations.
   */
  async getPayloadsRecursive(ids: string[]): Promise<ApiDefinitions.IApiPayload[]> {
    return this[sendMessage]('getPayloadsRecursive', ids) as Promise<ApiDefinitions.IApiPayload[]>;
  }

  /**
   * Adds an example to a Payload
   * @param id The if of the Payload to add the example to
   * @param init The example init options
   */
  async addPayloadExample(id: string, init: ExampleInit): Promise<AmfShapes.IApiDataExample> {
    return this[sendMessage]('addPayloadExample', id, init) as Promise<AmfShapes.IApiDataExample>;
  }

  /**
   * Removes an example from the Payload.
   * @param payloadId The domain id of the Payload
   * @param exampleId The domain id of the Example to remove.
   */
  async removePayloadExample(payloadId: string, exampleId: string): Promise<void> {
    return this[sendMessage]('removePayloadExample', payloadId, exampleId) as Promise<void>;
  }

  /**
   * Updates a scalar property of a Payload.
   * @param id The domain id of the payload.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated Payload
   */
  async updatePayloadProperty(id: string, property: keyof ApiDefinitions.IApiPayload, value: unknown): Promise<ApiDefinitions.IApiPayload> {
    return this[sendMessage]('updatePayloadProperty', id, property, value) as Promise<ApiDefinitions.IApiPayload>;
  }

  /**
   * Reads the TemplatedLink object from the graph.
   * @param id The domain id of the TemplatedLink
   */
  async getTemplatedLink(id: string): Promise<ApiDefinitions.IApiTemplatedLink> {
    return this[sendMessage]('getTemplatedLink', id) as Promise<ApiDefinitions.IApiTemplatedLink>;
  }

  /**
   * Lists the custom domain properties (domain extensions, annotations) definitions for the API.
   */
  async listCustomDomainProperties(): Promise<ApiCustomDomainExtensionListItem[]> {
    return this[sendMessage]('listCustomDomainProperties') as Promise<ApiCustomDomainExtensionListItem[]>;
  }

  /**
   * Creates a new type in the API.
   * @param init The Shape init options.
   */
  async addCustomDomainProperty(init?: CustomDomainPropertyInit): Promise<AmfBase.IApiCustomDomainProperty> {
    return this[sendMessage]('addCustomDomainProperty', init) as Promise<AmfBase.IApiCustomDomainProperty>;
  }

  /**
   * Reads the CustomDomainProperty object from the graph.
   * This is a definition of domain extension (RAML annotation).
   * 
   * @param id The domain id of the CustomDomainProperty
   */
  async getCustomDomainProperty(id: string): Promise<AmfBase.IApiCustomDomainProperty> {
    return this[sendMessage]('getCustomDomainProperty', id) as Promise<AmfBase.IApiCustomDomainProperty>;
  }

  /**
   * Removes a CustomDomainProperty from the API.
   * @param id The domain id of the CustomDomainProperty to remove
   * @returns True when the property was found and removed.
   */
  async deleteCustomDomainProperty(id: string): Promise<boolean> {
    return this[sendMessage]('deleteCustomDomainProperty', id) as Promise<boolean>;
  }

  /**
   * Updates a scalar property of a CustomDomainProperty.
   * @param id The domain id of the object.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated custom domain property
   */
  async updateCustomDomainProperty(id: string, property: keyof AmfBase.IApiCustomDomainProperty, value: unknown): Promise<AmfBase.IApiCustomDomainProperty> {
    return this[sendMessage]('updateCustomDomainProperty', id, property, value) as Promise<AmfBase.IApiCustomDomainProperty>;
  }

  /**
   * Reads the DomainExtension object from the graph.
   * This is a definition of applied to an object domain extension (RAML annotation).
   * 
   * @param id The domain id of the CustomDomainExtension
   */
  async getDomainExtension(id: string): Promise<ApiDefinitions.IApiCustomDomainExtension> {
    return this[sendMessage]('getDomainExtension', id) as Promise<ApiDefinitions.IApiCustomDomainExtension>;
  }

  /**
   * Reads the Request object from the graph.
   * @param id The domain id of the Request
   */
  async getRequest(id: string): Promise<ApiDefinitions.IApiRequest> {
    return this[sendMessage]('getRequest', id) as Promise<ApiDefinitions.IApiRequest>;
  }

  /**
   * Reads the Request object from the graph and returns the full serialized model.
   * @param id The domain id of the Request
   * @deprecated Remove all "recursive" operations.
   */
  async getRequestRecursive(id: string): Promise<ApiDefinitions.IApiRequest> {
    return this[sendMessage]('getRequestRecursive', id) as Promise<ApiDefinitions.IApiRequest>;
  }

  /**
   * @param operationId The operation domain id
   * @param init The request init options. Optional.
   * @returns The domain id of the created request
   */
  async addRequest(operationId: string, init?: OperationRequestInit): Promise<ApiDefinitions.IApiRequest> {
    return this[sendMessage]('addRequest', operationId, init) as Promise<ApiDefinitions.IApiRequest>;
  }

  /**
   * Adds a header to the request.
   * @param requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   */
  async addRequestHeader(requestId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    return this[sendMessage]('addRequestHeader', requestId, init) as Promise<ApiDefinitions.IApiParameter>;
  }

  /**
   * Removes a header from a request
   * @param requestId The request id to remove the header from
   * @param headerId The header id to remove.
   * @returns Updated request
   */
  async removeRequestHeader(requestId: string, headerId: string): Promise<ApiDefinitions.IApiRequest> {
    return this[sendMessage]('removeRequestHeader', requestId, headerId) as Promise<ApiDefinitions.IApiRequest>;
  }

  /**
   * Adds a query parameter to the request.
   * @param requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   */
  async addRequestQueryParameter(requestId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    return this[sendMessage]('addRequestQueryParameter', requestId, init) as Promise<ApiDefinitions.IApiParameter>;
  }

  /**
   * Removes a query parameter from a request
   * @param requestId The request id to remove the parameter from
   * @param paramId The parameter id to remove.
   * @returns Updated request
   */
  async removeRequestQueryParameter(requestId: string, paramId: string): Promise<ApiDefinitions.IApiRequest> {
    return this[sendMessage]('removeRequestQueryParameter', requestId, paramId) as Promise<ApiDefinitions.IApiRequest>;
  }

  /**
   * Adds a cookie to the request.
   * @param requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   */
  async addRequestCookieParameter(requestId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    return this[sendMessage]('addRequestCookieParameter', requestId, init) as Promise<ApiDefinitions.IApiParameter>;
  }

  /**
   * Removes a cookie parameter from a request
   * @param requestId The request id to remove the parameter from
   * @param paramId The parameter id to remove.
   * @returns Updated request
   */
  async removeRequestCookieParameter(requestId: string, paramId: string): Promise<ApiDefinitions.IApiRequest> {
    return this[sendMessage]('removeRequestCookieParameter', requestId, paramId) as Promise<ApiDefinitions.IApiRequest>;
  }

  /**
   * Creates a new payload in the request.
   * @param requestId The request domain id
   * @param {PayloadInit} init The payload init options
   * @returns {Promise<ApiPayload>} Created payload object.
   */
  async addRequestPayload(requestId: string, init: PayloadInit): Promise<ApiDefinitions.IApiPayload> {
    return this[sendMessage]('addRequestPayload', requestId, init) as Promise<ApiDefinitions.IApiPayload>;
  }

  /**
   * Removes a payload from a request object.
   * @param requestId The request domain id
   * @param payloadId The payload domain id.
   */
  async removeRequestPayload(requestId: string, payloadId: string): Promise<void> {
    return this[sendMessage]('removeRequestPayload', requestId, payloadId) as Promise<void>;
  }

  /**
   * @param requestId The request id to delete
   * @param operationId The id of the parent operation that has the request
   */
  async deleteRequest(requestId: string, operationId: string): Promise<void> {
    return this[sendMessage]('deleteRequest', requestId, operationId) as Promise<void>;
  }

  /**
   * Updates a scalar property of a Request.
   * @param id The domain id of the request.
   * @param property The property name to update
   * @param {any} value The new value to set.
   * @returns The updated request
   */
  async updateRequestProperty(id: string, property: keyof ApiDefinitions.IApiRequest, value: unknown): Promise<ApiDefinitions.IApiRequest> {
    return this[sendMessage]('updateRequestProperty', id, property, value) as Promise<ApiDefinitions.IApiRequest>;
  }

  /**
   * Reads the info about a parameter.
   * @param id The domain id of the parameter
   */
  async getParameter(id: string): Promise<ApiDefinitions.IApiParameter> {
    return this[sendMessage]('getParameter', id) as Promise<ApiDefinitions.IApiParameter>;
  }

  /**
   * Reads the info about a parameter and returns the full schema.
   * @param id The domain id of the parameter
   * @deprecated Remove all "recursive" operations.
   */
  async getParameterRecursive(id: string): Promise<ApiDefinitions.IApiParameter> {
    return this[sendMessage]('getParameterRecursive', id) as Promise<ApiDefinitions.IApiParameter>;
  }

  /**
   * Reads the list of Parameters in a single call.
   */
  async getParameters(ids: string[]): Promise<ApiDefinitions.IApiParameter[]> {
    return this[sendMessage]('getParameters', ids) as Promise<ApiDefinitions.IApiParameter[]>;
  }

  /**
   * Reads the list of Parameters in a single call and returns the full schema.
   * @deprecated Remove all "recursive" operations.
   */
  async getParametersRecursive(ids: string[]): Promise<ApiDefinitions.IApiParameter[]> {
    return this[sendMessage]('getParametersRecursive', ids) as Promise<ApiDefinitions.IApiParameter[]>;
  }

  /**
   * Updates a scalar property of a Parameter.
   * @param id The domain id of the parameter.
   * @param {keyof Parameter} property The property name to update
   * @param {any} value The new value to set.
   * @returns The updated Parameter
   */
  async updateParameterProperty(id: string, property: keyof ApiDefinitions.IApiParameter, value: unknown): Promise<ApiDefinitions.IApiParameter> {
    return this[sendMessage]('updateParameterProperty', id, property, value) as Promise<ApiDefinitions.IApiParameter>;
  }

  /**
   * Adds an example to a Parameter
   * @param id The if of the Parameter to add the example to
   * @param init The example init options
   */
  async addParameterExample(id: string, init: ExampleInit): Promise<AmfShapes.IApiDataExample> {
    return this[sendMessage]('addParameterExample', id, init) as Promise<AmfShapes.IApiDataExample>;
  }

  /**
   * Removes an example from the parameter.
   * @param paramId The domain id of the Parameter
   * @param exampleId The domain id of the Example to remove.
   */
  async removeParameterExample(paramId: string, exampleId: string): Promise<void> {
    return this[sendMessage]('removeParameterExample', paramId, exampleId) as Promise<void>;
  }

  /**
   * Lists the documentation definitions for the API.
   */
  async listDocumentations(): Promise<ApiDefinitions.IApiDocumentation[]> {
    return this[sendMessage]('listDocumentations') as Promise<ApiDefinitions.IApiDocumentation[]>;
  }

  /**
   * Adds a new documentation object to the graph.
   * @param init The initialization properties
   * @returns The created documentation.
   */
  async addDocumentation(init: DocumentationInit): Promise<ApiDefinitions.IApiDocumentation> {
    return this[sendMessage]('addDocumentation', init) as Promise<ApiDefinitions.IApiDocumentation>;
  }

  /**
   * Reads the documentation object from the store.
   * @param id The domain id of the documentation object
   * @returns The read documentation.
   */
  async getDocumentation(id: string): Promise<ApiDefinitions.IApiDocumentation | undefined> {
    return this[sendMessage]('getDocumentation', id) as Promise<ApiDefinitions.IApiDocumentation | undefined>;
  }

  /**
   * Updates a scalar property of a documentation.
   * @param id The domain id of the documentation.
   * @param property The property name to update
   * @param {any} value The new value to set.
   */
  async updateDocumentationProperty(id: string, property: keyof ApiDefinitions.IApiDocumentation, value: unknown): Promise<ApiDefinitions.IApiDocumentation> {
    return this[sendMessage]('updateDocumentationProperty', id, property, value) as Promise<ApiDefinitions.IApiDocumentation>;
  }

  /**
   * Removes the documentation from the graph.
   * @param id The domain id of the documentation object
   */
  async deleteDocumentation(id: string): Promise<void> {
    await this[sendMessage]('deleteDocumentation', id) as Promise<void>;
  }

  /**
   * Lists the type (schema) definitions for the API.
   */
  async listTypes(): Promise<ApiNodeShapeListItem[]> {
    return this[sendMessage]('listTypes') as Promise<ApiNodeShapeListItem[]>;
  }

  /**
   * 
   * @param id The domain id of the API type (schema).
   */
  async getType(id: string): Promise<AmfShapes.IShapeUnion> {
    return this[sendMessage]('getType', id) as Promise<AmfShapes.IShapeUnion>;
  }

  /**
   * Reads types data in a bulk operation
   * @param {string[]} ids The ids to read
   */
  async getTypes(ids: string[]): Promise<AmfShapes.IShapeUnion[]> {
    return this[sendMessage]('getTypes', ids) as Promise<AmfShapes.IShapeUnion[]>;
  }

  /**
   * Creates a new type in the API.
   * @param init The Shape init options.
   */
  async addType(init?: ShapeInit): Promise<AmfShapes.IShapeUnion> {
    return this[sendMessage]('addType', init) as Promise<AmfShapes.IShapeUnion>;
  }

  /**
   * Removes a type for a given domain id.
   * @param id The type domain id.
   * @returns True when the type has been found and removed.
   */
  async deleteType(id: string): Promise<boolean> {
    return this[sendMessage]('deleteType', id) as Promise<boolean>;
  }

  /**
   * Updates a scalar property of a type.
   * @param id The domain id of the type.
   * @param property The property name to update
   * @param value The new value to set.
   */
  async updateTypeProperty(id: string, property: string, value: unknown): Promise<AmfShapes.IShapeUnion> {
    return this[sendMessage]('updateTypeProperty', id, property, value) as Promise<AmfShapes.IShapeUnion>;
  }

  /**
   * Reads the definition of a property of a NodeShape.
   * @param id The domain id of the property.
   * @throws {Error} An error when the type couldn't be find.
   */
  async getPropertyShape(id: string): Promise<AmfShapes.IApiPropertyShape> {
    return this[sendMessage]('getPropertyShape', id) as Promise<AmfShapes.IApiPropertyShape>;
  }

  /**
   * Creates a new property on a type.
   * @param id The id of the type to add the property to.
   * @param init The property initialization configuration.
   * @throws {Error} An error when the type couldn't be find.
   * @throws {Error} An error when the type is not a NodeShape.
   */
  async addPropertyShape(id: string, init: PropertyShapeInit): Promise<AmfShapes.IApiPropertyShape> {
    return this[sendMessage]('addPropertyShape', id, init) as Promise<AmfShapes.IApiPropertyShape>;
  }

  /**
   * Removes a property from a node shape.
   * @param typeId The domain id of a parent type
   * @param propertyId The id of the property to remove.
   * @throws {Error} An error when the type couldn't be find.
   */
  async deletePropertyShape(typeId: string, propertyId: string): Promise<void> {
    return this[sendMessage]('deletePropertyShape', typeId, propertyId) as Promise<void>;
  }

  /**
   * Updates a scalar property of a property of a NodeShape.
   * @param parent The domain id of the parent type.
   * @param id The domain id of the property.
   * @param property The property name to update
   * @param value The new value to set.
   */
  async updatePropertyShapeProperty(parent: string, id: string, property: keyof AmfShapes.IApiPropertyShape, value: unknown): Promise<AmfShapes.IApiPropertyShape> {
    return this[sendMessage]('updatePropertyShapeProperty', parent, id, property, value) as Promise<AmfShapes.IApiPropertyShape>;
  }

  /**
   * Lists the security definitions for the API.
   */
  async listSecurity(): Promise<ApiDefinitions.IApiSecuritySchemeListItem[]> {
    return this[sendMessage]('listSecurity') as Promise<ApiDefinitions.IApiSecuritySchemeListItem[]>;
  }

  /**
   * Reads the SecurityRequirement object from the graph.
   * @param id The domain id of the SecurityRequirement
   */
  async getSecurityRequirement(id: string): Promise<ApiDefinitions.IApiSecurityRequirement> {
    return this[sendMessage]('getSecurityRequirement', id) as Promise<ApiDefinitions.IApiSecurityRequirement>;
  }

  /**
   * Reads the SecurityRequirement object from the graph.
   * @param id The domain id of the SecurityRequirement
   * @deprecated Remove all "recursive" operations.
   */
  async getSecurityRequirementRecursive(id: string): Promise<ApiDefinitions.IApiSecurityRequirement> {
    return this[sendMessage]('getSecurityRequirementRecursive', id) as Promise<ApiDefinitions.IApiSecurityRequirement>;
  }

  /**
   * Reads the ParametrizedSecurityScheme object from the graph.
   * @param id The domain id of the ParametrizedSecurityScheme
   */
  async getParametrizedSecurityScheme(id: string): Promise<ApiDefinitions.IApiParametrizedSecurityScheme> {
    return this[sendMessage]('getParametrizedSecurityScheme', id) as Promise<ApiDefinitions.IApiParametrizedSecurityScheme>;
  }

  /**
   * Reads the ParametrizedSecurityScheme object from the graph.
   * @param id The domain id of the ParametrizedSecurityScheme
   * @deprecated Remove all "recursive" operations.
   */
  async getParametrizedSecuritySchemeRecursive(id: string): Promise<ApiDefinitions.IApiParametrizedSecurityScheme> {
    return this[sendMessage]('getParametrizedSecuritySchemeRecursive', id) as Promise<ApiDefinitions.IApiParametrizedSecurityScheme>;
  }

  /**
   * Reads the SecurityScheme object from the graph.
   * @param id The domain id of the SecurityScheme
   */
  async getSecurityScheme(id: string): Promise<ApiDefinitions.IApiSecurityScheme> {
    return this[sendMessage]('getSecurityScheme', id) as Promise<ApiDefinitions.IApiSecurityScheme>;
  }

  /**
   * Reads the SecurityScheme object from the graph.
   * @param id The domain id of the SecurityScheme
   * @deprecated Remove all "recursive" operations.
   */
  async getSecuritySchemeRecursive(id: string): Promise<ApiDefinitions.IApiSecurityScheme> {
    return this[sendMessage]('getSecuritySchemeRecursive', id) as Promise<ApiDefinitions.IApiSecurityScheme>;
  }

  /**
   * @param id The domain id of the security settings.
   */
  async getSecuritySettings(id: string): Promise<ApiDefinitions.IApiSecuritySettingsUnion> {
    return this[sendMessage]('getSecuritySettings', id) as Promise<ApiDefinitions.IApiSecuritySettingsUnion>;
  }

  /**
   * Reads the OAuth2Flow object from the graph.
   * @param id The domain id of the flow to read.
   */
  async getOAuthFlow(id: string): Promise<ApiDefinitions.IApiSecurityOAuth2Flow> {
    return this[sendMessage]('getOAuthFlow', id) as Promise<ApiDefinitions.IApiSecurityOAuth2Flow>;
  }

  /**
   * Reads the OAuth2Flow object from the graph.
   * @param id The domain id of the flow to read.
   */
  async getOAuthScope(id: string): Promise<ApiDefinitions.IApiSecurityScope> {
    return this[sendMessage]('getOAuthScope', id) as Promise<ApiDefinitions.IApiSecurityScope>;
  }

  /**
   * @returns The ID of the message, unique per call.
   */
  [getId](): number {
    const id = this[nextIdValue];
    this[nextIdValue] += 1;
    return id;
  }

  /**
   * Creates an instance of the web worker.
   */
  [createWorker](): unknown {
    throw new Error("Method not implemented.");
  }

  /**
   * The worker location in the final build of the app may be anywhere.
   */
  [readWorkerUrl](): string {
    throw new Error("Method not implemented.");
  }

  [responseHandler](e: unknown): void {
    // ...
  }

  /**
   * A function that processes the response from the worker process
   */
  [processResponse](data: WorkerResponse): void {
    const { id, result, error, message, stack } = data;
    const promise = this[queueValue].get(id);
    this[queueValue].delete(id);
    if (!promise) {
      // eslint-disable-next-line no-console
      console.warn(`WorkerProxy: no promise for ${id}`);
      return;
    }
    if (error) {
      const e = new Error(message);
      if (stack) {
        e.stack = stack;
      }
      promise.rejecter(e);
    } else {
      promise.resolver(result);
    }
  }

  [errorHandler](): Error {
    const e = new Error("Modeling data store worker general error");
    // eslint-disable-next-line no-console
    console.error(e);
    if (this[queueValue].size === 1) {
      const entry = this[queueValue].entries().next().value;
      const promise = entry[1];
      promise.rejecter(e);
    }
    return e;
  }

  /**
   * Creates a promise returned by all action functions and adds it to the queue.
   * @param id The id of the message.
   */
  [createResponsePromise](id: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this[queueValue].set(id, {
        resolver: resolve,
        rejecter: reject,
      });
    });
  }

  /**
   * Sends a message to the worker.
   * @param type The type of the message
   * @param {...any} args A list of optional arguments.
   */
  [sendMessage](type: string, ...args: unknown[]): Promise<unknown> {
    return Promise.resolve(null);
  }
}
