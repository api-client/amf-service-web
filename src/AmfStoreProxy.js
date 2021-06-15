/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/** @typedef {import('amf-client-js').model.domain.EndPoint} EndPoint */
/** @typedef {import('amf-client-js').model.domain.Operation} Operation */
/** @typedef {import('amf-client-js').model.domain.Parameter} Parameter */
/** @typedef {import('amf-client-js').model.domain.Request} Request */
/** @typedef {import('amf-client-js').model.domain.Response} Response */
/** @typedef {import('amf-client-js').model.domain.CreativeWork} CreativeWork */
/** @typedef {import('amf-client-js').model.domain.Payload} Payload */
/** @typedef {import('amf-client-js').model.domain.Example} Example */
/** @typedef {import('amf-client-js').model.domain.CustomDomainProperty} CustomDomainProperty */
/** @typedef {import('./types').WorkerResponse} WorkerResponse */
/** @typedef {import('./types').WorkerQueueItem} WorkerQueueItem */
/** @typedef {import('./types').ApiInit} ApiInit */
/** @typedef {import('./types').EndPointInit} EndPointInit */
/** @typedef {import('./types').OperationInit} OperationInit */
/** @typedef {import('./types').OperationRequestInit} OperationRequestInit */
/** @typedef {import('./types').OperationResponseInit} OperationResponseInit */
/** @typedef {import('./types').ApiEndPoint} ApiEndPoint */
/** @typedef {import('./types').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('./types').ApiOperation} ApiOperation */
/** @typedef {import('./types').ApiOperationListItem} ApiOperationListItem */
/** @typedef {import('./types').ApiServer} ApiServer */
/** @typedef {import('./types').ApiServerInit} ApiServerInit */
/** @typedef {import('./types').ApiParameter} ApiParameter */
/** @typedef {import('./types').ApiExample} ApiExample */
/** @typedef {import('./types').ApiPayload} ApiPayload */
/** @typedef {import('./types').ApiResponse} ApiResponse */
/** @typedef {import('./types').ApiTemplatedLink} ApiTemplatedLink */
/** @typedef {import('./types').ApiSecurityRequirement} ApiSecurityRequirement */
/** @typedef {import('./types').ApiParametrizedSecurityScheme} ApiParametrizedSecurityScheme */
/** @typedef {import('./types').ApiSecurityScheme} ApiSecurityScheme */
/** @typedef {import('./types').ApiRequest} ApiRequest */
/** @typedef {import('./types').ApiCustomDomainProperty} ApiCustomDomainProperty */
/** @typedef {import('./types').ApiSecuritySchemeListItem} ApiSecuritySchemeListItem */
/** @typedef {import('./types').ApiDocumentation} ApiDocumentation */
/** @typedef {import('./types').ApiNodeShapeListItem} ApiNodeShapeListItem */
/** @typedef {import('./types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('./types').SerializedApi} SerializedApi */
/** @typedef {import('./types').DocumentationInit} DocumentationInit */
/** @typedef {import('./types').ApiNodeShape} ApiNodeShape */
/** @typedef {import('./types').ShapeInit} ShapeInit */
/** @typedef {import('./types').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('./types').ParameterInit} ParameterInit */
/** @typedef {import('./types').PayloadInit} PayloadInit */
/** @typedef {import('./types').ExampleInit} ExampleInit */
/** @typedef {import('./types').ApiSecurityOAuth2Flow} ApiSecurityOAuth2Flow */
/** @typedef {import('./types').ApiSecurityScope} ApiSecurityScope */
/** @typedef {import('./types').ApiResource} ApiResource */
/** @typedef {import('./types').ParserVendors} ParserVendors */
/** @typedef {import('./types').ParserMediaTypes} ParserMediaTypes */
/** @typedef {import('./types').ApiDomainExtension} ApiDomainExtension */
/** @typedef {import('./types').ApiCustomDomainPropertyListItem} ApiCustomDomainPropertyListItem */
/** @typedef {import('./types').CustomDomainPropertyInit} CustomDomainPropertyInit */
/** @typedef {import('./types').ApiSecuritySettingsUnion} ApiSecuritySettingsUnion */

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
  /**
   * @type {any}
   */
  get worker() {
    return null;
  }

  constructor() {
    /**
     * @type {any}
     */
    this[workerValue] = undefined;
    this[nextIdValue] = 0;

    /**
     * @type {Map<number, WorkerQueueItem>}
     */
    this[queueValue] = new Map();

    this[responseHandler] = this[responseHandler].bind(this);
    this[errorHandler] = this[errorHandler].bind(this);
  }

  /**
   * Initializes the backend store.
   * @return {Promise<void>}
   */
  async init() {
    return this[sendMessage]('init');
  }

  /**
   * Loads an API project into the store.
   * @param {ApiResource[]} contents The list of files to process.
   * @param {ParserVendors} vendor The vendor of the API.
   * @param {ParserMediaTypes} mediaType The API media type
   * @param {string} main The name of the main API file.
   */
  async loadApi(contents, vendor, mediaType, main) {
    return this[sendMessage]('loadApi', contents, vendor, mediaType, main);
  }

  /**
   * @param {string} model
   * @returns {Promise<void>}
   */
  loadGraph(model) {
    return this[sendMessage]('loadGraph', model);
  }

  /**
   * Creates new Document in the graph.
   * @param {ApiInit=} init Api init options
   * @returns {Promise<string>} The domain id of the created WebAPI
   */
  async createWebApi(init) {
    return this[sendMessage]('createWebApi', init);
  }

  /**
   * Generates RAML api from the current graph.
   * @returns {Promise<string>} RAML value for the API.
   */
  async generateRaml() {
    return this[sendMessage]('generateRaml');
  }

  /**
   * Generates json+ld from the current graph.
   * @returns {Promise<string>} JSON+ld value of the API.
   */
  async generateGraph() {
    return this[sendMessage]('generateGraph');
  }

  /**
   * Reads basic info about the API.
   * @returns {Promise<SerializedApi>}
   */
  async getApi() {
    return this[sendMessage]('getApi');
  }

  /**
   * @returns {Promise<ApiServer[]>} List of servers in this API.
   */
  async listServers() {
    return this[sendMessage]('listServers');
  }

  /**
   * Adds a server definition to the API.
   * @param {ApiServerInit} init 
   * @returns {Promise<ApiServer>} The instance of the created server
   */
  async addServer(init) {
    return this[sendMessage]('addServer', init);
  }

  /**
   * Reads the Server definition from the graph.
   * @param {string} id The domain id of the Server to read
   * @returns {Promise<ApiServer>}
   */
  async getServer(id) {
    return this[sendMessage]('getServer', id);
  }

  /**
   * List all endpoints in the API.
   * @returns {Promise<ApiEndPointListItem[]>}
   */
  async listEndpoints() {
    return this[sendMessage]('listEndpoints');
  }

  /**
   * Lists all endpoints with operations included into the result.
   * @returns {Promise<ApiEndPointWithOperationsListItem[]>}
   */
  async listEndpointsWithOperations() {
    return this[sendMessage]('listEndpointsWithOperations');
  }

  /**
   * Adds a new endpoint to the API and returns it.
   * @param {EndPointInit} init EndPoint init parameters
   * @returns {Promise<ApiEndPoint>}
   */
  async addEndpoint(init) {
    return this[sendMessage]('addEndpoint', init);
  }

  /**
   * Removes endpoint from the API.
   * @param {string} id The endpoint domain id.
   * @returns {Promise<void>}
   */
  async deleteEndpoint(id) {
    await this[sendMessage]('deleteEndpoint', id);
  }

  /**
   * Reads the information about an endpoint and returns it.
   * @param {string} idOrPath The domain id of the endpoint or its path.
   * @returns {Promise<ApiEndPoint>}
   */
  async getEndpoint(idOrPath) {
    return this[sendMessage]('getEndpoint', idOrPath);
  }

  /**
   * Updates a scalar property of an endpoint.
   * @param {string} id The domain id of the operation.
   * @param {keyof EndPoint} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiEndPoint>}
   */
  async updateEndpointProperty(id, property, value) {
    return this[sendMessage]('updateEndpointProperty', id, property, value);
  }

  /**
   * Adds an empty operation to an endpoint.
   * @param {string} pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param {OperationInit} init The operation initialize options
   * @returns {Promise<ApiOperation>}
   */
  async addOperation(pathOrId, init) {
    return this[sendMessage]('addOperation', pathOrId, init);
  }

  /**
   * Reads the operation model.
   * @param {string} methodOrId Method name or the domain id of the operation to find
   * @param {string=} pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   * @returns {Promise<ApiOperation>}
   */
  async getOperation(methodOrId, pathOrId) {
    return this[sendMessage]('getOperation', methodOrId, pathOrId);
  }

  /**
   * Lists all operations in an endpoint.
   * @param {string} pathOrId The domain id of the endpoint to list operations from or its path.
   * @returns {Promise<ApiOperationListItem[]>}
   */
  async listOperations(pathOrId) {
    return this[sendMessage]('listOperations', pathOrId);
  }

  /**
   * Removes an operation from the graph.
   * @param {string} id The operation id to remove.
   * @param {string} endpointId The domain id of the parent endpoint.
   * @returns {Promise<string|undefined>} The id of the affected endpoint. Undefined when operation or endpoint cannot be found.
   */
  async deleteOperation(id, endpointId) {
    return this[sendMessage]('deleteOperation', id, endpointId);
  }

  /**
   * Finds an endpoint that has the operation.
   * @param {string} methodOrId Method name or the domain id of the operation to find
   * @param {string=} pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   * @returns {Promise<ApiEndPoint|undefined>}
   */
  async getOperationParent(methodOrId, pathOrId) {
    return this[sendMessage]('getOperationParent', methodOrId, pathOrId);
  }

  /**
   * Updates a scalar property of an operation.
   * @param {string} id The domain id of the operation.
   * @param {keyof Operation} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiOperation>}
   */
  async updateOperationProperty(id, property, value) {
    return this[sendMessage]('updateOperationProperty', id, property, value);
  }

  /**
   * @param {string} operationId The operation domain id
   * @param {OperationResponseInit} init The response init options.
   * @returns {Promise<ApiResponse>} The domain id of the created response
   */
  async addResponse(operationId, init) {
    return this[sendMessage]('addResponse', operationId, init);
  }

  /**
   * Reads the response data from the graph.
   * @param {string} id The domain id of the response.
   * @returns {Promise<ApiResponse>}
   */
  async getResponse(id) {
    return this[sendMessage]('getResponse', id);
  }

  /**
   * Adds a header to the response.
   * @param {string} responseId The response domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  async addResponseHeader(responseId, init) {
    return this[sendMessage]('addResponseHeader', responseId, init);
  }

  /**
   * Removes a header from a response
   * @param {string} responseId The response id to remove the header from
   * @param {string} headerId The header id to remove.
   * @returns {Promise<ApiResponse>} Updated response
   */
  async removeResponseHeader(responseId, headerId) {
    return this[sendMessage]('removeResponseHeader', responseId, headerId);
  }

  /**
   * Creates a new payload in the response.
   * @param {string} responseId The response domain id
   * @param {PayloadInit} init The payload init options
   * @returns {Promise<ApiPayload>} Created payload object.
   */
  async addResponsePayload(responseId, init) {
    return this[sendMessage]('addResponsePayload', responseId, init);
  }

  /**
   * Removes a payload from a response object.
   * @param {string} responseId The response domain id
   * @param {string} payloadId The payload domain id.
   * @returns {Promise<void>}
   */
  async removeResponsePayload(responseId, payloadId) {
    return this[sendMessage]('removeResponsePayload', responseId, payloadId);
  }

  /**
   * Updates a scalar property of a Response.
   * @param {string} id The domain id of the response.
   * @param {keyof Response} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiResponse>} The updated response
   */
  async updateResponseProperty(id, property, value) {
    return this[sendMessage]('updateResponseProperty', id, property, value);
  }

  /**
   * @param {string} responseId The response id to delete
   * @param {string} operationId The id of the parent operation that has the response
   * @returns {Promise<void>}
   */
  async deleteResponse(responseId, operationId) {
    return this[sendMessage]('deleteResponse', responseId, operationId);
  }

  /**
   * Reads example value from the store.
   * @param {string} id The id of the example to read.
   * @returns {Promise<ApiExample>}
   */
  async getExample(id) {
    return this[sendMessage]('getExample', id);
  }

  /**
   * Updates a scalar property of an Example.
   * @param {string} id The domain id of the response.
   * @param {keyof Example} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiExample>} The updated example
   */
  async updateExampleProperty(id, property, value) {
    return this[sendMessage]('updateExampleProperty', id, property, value);
  }

  /**
   * Reads Payload data from the graph
   * @param {string} id The domain id of the payload
   * @returns {Promise<ApiPayload>}
   */
  async getPayload(id) {
    return this[sendMessage]('getPayload', id);
  }

  /**
   * Adds an example to a Payload
   * @param {string} id The if of the Payload to add the example to
   * @param {ExampleInit} init The example init options
   * @returns {Promise<ApiExample>}
   */
  async addPayloadExample(id, init) {
    return this[sendMessage]('addPayloadExample', id, init);
  }

  /**
   * Removes an example from the Payload.
   * @param {string} payloadId The domain id of the Payload
   * @param {string} exampleId The domain id of the Example to remove.
   */
  async removePayloadExample(payloadId, exampleId) {
    return this[sendMessage]('removePayloadExample', payloadId, exampleId);
  }

  /**
   * Updates a scalar property of a Payload.
   * @param {string} id The domain id of the payload.
   * @param {keyof Payload} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiPayload>} The updated Payload
   */
  async updatePayloadProperty(id, property, value) {
    return this[sendMessage]('updatePayloadProperty', id, property, value);
  }

  /**
   * Reads the TemplatedLink object from the graph.
   * @param {string} id The domain id of the TemplatedLink
   * @returns {Promise<ApiTemplatedLink>}
   */
  async getTemplatedLink(id) {
    return this[sendMessage]('getTemplatedLink', id);
  }

  /**
   * Lists the custom domain properties (domain extensions, annotations) definitions for the API.
   * @returns {Promise<ApiCustomDomainPropertyListItem[]>}
   */
  async listCustomDomainProperties() {
    return this[sendMessage]('listCustomDomainProperties');
  }

  /**
   * Creates a new type in the API.
   * @param {CustomDomainPropertyInit=} init The Shape init options.
   * @returns {Promise<ApiCustomDomainProperty>}
   */
  async addCustomDomainProperty(init) {
    return this[sendMessage]('addCustomDomainProperty', init);
  }

  /**
   * Reads the CustomDomainProperty object from the graph.
   * This is a definition of domain extension (RAML annotation).
   * 
   * @param {string} id The domain id of the CustomDomainProperty
   * @returns {Promise<ApiCustomDomainProperty>}
   */
  async getCustomDomainProperty(id) {
    return this[sendMessage]('getCustomDomainProperty', id);
  }

  /**
   * Removes a CustomDomainProperty from the API.
   * @param {string} id The domain id of the CustomDomainProperty to remove
   * @returns {Promise<boolean>} True when the property was found and removed.
   */
  async deleteCustomDomainProperty(id) {
    return this[sendMessage]('deleteCustomDomainProperty', id);
  }

  /**
   * Updates a scalar property of a CustomDomainProperty.
   * @param {string} id The domain id of the object.
   * @param {keyof CustomDomainProperty} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiCustomDomainProperty>} The updated custom domain property
   */
  async updateCustomDomainProperty(id, property, value) {
    return this[sendMessage]('updateCustomDomainProperty', id, property, value);
  }

  /**
   * Reads the DomainExtension object from the graph.
   * This is a definition of applied to an object domain extension (RAML annotation).
   * 
   * @param {string} id The domain id of the CustomDomainProperty
   * @returns {Promise<ApiDomainExtension>}
   */
  async getDomainExtension(id) {
    return this[sendMessage]('getDomainExtension', id);
  }

  /**
   * Reads the Request object from the graph.
   * @param {string} id The domain id of the Request
   * @returns {Promise<ApiRequest>}
   */
  async getRequest(id) {
    return this[sendMessage]('getRequest', id);
  }

  /**
   * @param {string} operationId The operation domain id
   * @param {OperationRequestInit=} init The request init options. Optional.
   * @returns {Promise<ApiRequest>} The domain id of the created request
   */
  async addRequest(operationId, init) {
    return this[sendMessage]('addRequest', operationId, init);
  }

  /**
   * Adds a header to the request.
   * @param {string} requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  async addRequestHeader(requestId, init) {
    return this[sendMessage]('addRequestHeader', requestId, init);
  }

  /**
   * Removes a header from a request
   * @param {string} requestId The request id to remove the header from
   * @param {string} headerId The header id to remove.
   * @returns {Promise<ApiRequest>} Updated request
   */
  async removeRequestHeader(requestId, headerId) {
    return this[sendMessage]('removeRequestHeader', requestId, headerId);
  }

  /**
   * Adds a query parameter to the request.
   * @param {string} requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  async addRequestQueryParameter(requestId, init) {
    return this[sendMessage]('addRequestQueryParameter', requestId, init);
  }

  /**
   * Removes a query parameter from a request
   * @param {string} requestId The request id to remove the parameter from
   * @param {string} paramId The parameter id to remove.
   * @returns {Promise<ApiRequest>} Updated request
   */
  async removeRequestQueryParameter(requestId, paramId) {
    return this[sendMessage]('removeRequestQueryParameter', requestId, paramId);
  }

  /**
   * Adds a cookie to the request.
   * @param {string} requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  async addRequestCookieParameter(requestId, init) {
    return this[sendMessage]('addRequestCookieParameter', requestId, init);
  }

  /**
   * Removes a cookie parameter from a request
   * @param {string} requestId The request id to remove the parameter from
   * @param {string} paramId The parameter id to remove.
   * @returns {Promise<ApiRequest>} Updated request
   */
  async removeRequestCookieParameter(requestId, paramId) {
    return this[sendMessage]('removeRequestCookieParameter', requestId, paramId);
  }

  /**
   * Creates a new payload in the request.
   * @param {string} requestId The request domain id
   * @param {PayloadInit} init The payload init options
   * @returns {Promise<ApiPayload>} Created payload object.
   */
  async addRequestPayload(requestId, init) {
    return this[sendMessage]('addRequestPayload', requestId, init);
  }

  /**
   * Removes a payload from a request object.
   * @param {string} requestId The request domain id
   * @param {string} payloadId The payload domain id.
   * @returns {Promise<void>}
   */
  async removeRequestPayload(requestId, payloadId) {
    return this[sendMessage]('removeRequestPayload', requestId, payloadId);
  }

  /**
   * @param {string} requestId The request id to delete
   * @param {string} operationId The id of the parent operation that has the request
   * @returns {Promise<void>}
   */
  async deleteRequest(requestId, operationId) {
    return this[sendMessage]('deleteRequest', requestId, operationId);
  }

  /**
   * Updates a scalar property of a Request.
   * @param {string} id The domain id of the request.
   * @param {keyof Request} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiRequest>} The updated request
   */
  async updateRequestProperty(id, property, value) {
    return this[sendMessage]('updateRequestProperty', id, property, value);
  }

  /**
   * Reads the info about a parameter.
   * @param {string} id The domain id of the parameter
   * @returns {Promise<ApiParameter>}
   */
  async getParameter(id) {
    return this[sendMessage]('getParameter', id);
  }

  /**
   * Updates a scalar property of a Parameter.
   * @param {string} id The domain id of the parameter.
   * @param {keyof Parameter} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiParameter>} The updated Parameter
   */
  async updateParameterProperty(id, property, value) {
    return this[sendMessage]('updateParameterProperty', id, property, value);
  }

  /**
   * Adds an example to a Parameter
   * @param {string} id The if of the Parameter to add the example to
   * @param {ExampleInit} init The example init options
   * @returns {Promise<ApiExample>}
   */
  async addParameterExample(id, init) {
    return this[sendMessage]('addParameterExample', id, init);
  }

  /**
   * Removes an example from the parameter.
   * @param {string} paramId The domain id of the Parameter
   * @param {string} exampleId The domain id of the Example to remove.
   */
  async removeParameterExample(paramId, exampleId) {
    return this[sendMessage]('removeParameterExample', paramId, exampleId);
  }

  /**
   * Lists the documentation definitions for the API.
   * @returns {Promise<ApiDocumentation[]>}
   */
  async listDocumentations() {
    return this[sendMessage]('listDocumentations');
  }

  /**
   * Adds a new documentation object to the graph.
   * @param {DocumentationInit} init The initialization properties
   * @returns {Promise<ApiDocumentation>} The created documentation.
   */
  async addDocumentation(init) {
    return this[sendMessage]('addDocumentation', init);
  }

  /**
   * Reads the documentation object from the store.
   * @param {string} id The domain id of the documentation object
   * @returns {Promise<ApiDocumentation|undefined>} The read documentation.
   */
  async getDocumentation(id) {
    return this[sendMessage]('getDocumentation', id);
  }

  /**
   * Updates a scalar property of a documentation.
   * @param {string} id The domain id of the documentation.
   * @param {keyof CreativeWork} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiDocumentation>}
   */
  async updateDocumentationProperty(id, property, value) {
    return this[sendMessage]('updateDocumentationProperty', id, property, value);
  }

  /**
   * Removes the documentation from the graph.
   * @param {string} id The domain id of the documentation object
   */
  async deleteDocumentation(id) {
    await this[sendMessage]('deleteDocumentation', id);
  }

  /**
   * Lists the type (schema) definitions for the API.
   * @returns {Promise<ApiNodeShapeListItem[]>}
   */
  async listTypes() {
    return this[sendMessage]('listTypes');
  }

  /**
   * 
   * @param {string} id The domain id of the API type (schema).
   * @returns {Promise<ApiShapeUnion>}
   */
  async getType(id) {
    return this[sendMessage]('getType', id);
  }

  /**
   * Creates a new type in the API.
   * @param {ShapeInit=} init The Shape init options.
   * @returns {Promise<ApiShapeUnion>}
   */
  async addType(init) {
    return this[sendMessage]('addType', init);
  }

  /**
   * Removes a type for a given domain id.
   * @param {string} id The type domain id.
   * @returns {Promise<boolean>} True when the type has been found and removed.
   */
  async deleteType(id) {
    return this[sendMessage]('deleteType', id);
  }

  /**
   * Updates a scalar property of a type.
   * @param {string} id The domain id of the type.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiShapeUnion>}
   */
  async updateTypeProperty(id, property, value) {
    return this[sendMessage]('updateTypeProperty', id, property, value);
  }

  /**
   * Lists the security definitions for the API.
   * @returns {Promise<ApiSecuritySchemeListItem[]>}
   */
  async listSecurity() {
    return this[sendMessage]('listSecurity');
  }

  /**
   * Reads the SecurityRequirement object from the graph.
   * @param {string} id The domain id of the SecurityRequirement
   * @returns {Promise<ApiSecurityRequirement>}
   */
  async getSecurityRequirement(id) {
    return this[sendMessage]('getSecurityRequirement', id);
  }

  /**
   * Reads the ParametrizedSecurityScheme object from the graph.
   * @param {string} id The domain id of the ParametrizedSecurityScheme
   * @returns {Promise<ApiParametrizedSecurityScheme>}
   */
  async getParametrizedSecurityScheme(id) {
    return this[sendMessage]('getParametrizedSecurityScheme', id);
  }

  /**
   * Reads the SecurityScheme object from the graph.
   * @param {string} id The domain id of the SecurityScheme
   * @returns {Promise<ApiSecurityScheme>}
   */
  async getSecurityScheme(id) {
    return this[sendMessage]('getSecurityScheme', id);
  }

  /**
   * @param {string} id The domain id of the security settings.
   * @returns {Promise<ApiSecuritySettingsUnion>}
   */
  async getSecuritySettings(id) {
    return this[sendMessage]('getSecuritySettings', id);
  }

  /**
   * Reads the OAuth2Flow object from the graph.
   * @param {string} id The domain id of the flow to read.
   * @returns {Promise<ApiSecurityOAuth2Flow>}
   */
  async getOAuthFlow(id) {
    return this[sendMessage]('getOAuthFlow', id);
  }

  /**
   * Reads the OAuth2Flow object from the graph.
   * @param {string} id The domain id of the flow to read.
   * @returns {Promise<ApiSecurityScope>}
   */
  async getOAuthScope(id) {
    return this[sendMessage]('getOAuthScope', id);
  }

  /**
   * @returns {number} The ID of the message, unique per call.
   */
  [getId]() {
    const id = this[nextIdValue];
    this[nextIdValue] += 1;
    return id;
  }

  /**
   * Creates an instance of the web worker.
   */
  [createWorker]() {
    return null;
  }

  /**
   * The worker location in the final build of the app may be anywhere.
   * @returns {string}
   */
  [readWorkerUrl]() {
    return null;
  }

  /**
   * @param {MessageEvent} e
   */
  [responseHandler](e) {
    // ...
  }

  /**
   * A function that processes the response from the worker process
   * @param {WorkerResponse} data
   */
  [processResponse](data) {
    const { id, result, error, message } = data;
    if (!this[queueValue].has(id)) {
      // eslint-disable-next-line no-console
      console.warn(`WorkerProxy: no promise for ${id}`);
      return;
    }
    const promise = this[queueValue].get(id);
    this[queueValue].delete(id);
    if (error) {
      promise.rejecter(new Error(message));
    } else {
      promise.resolver(result);
    }
  }

  [errorHandler]() {
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
   * @param {number} id The id of the message.
   */
  [createResponsePromise](id) {
    return new Promise((resolve, reject) => {
      this[queueValue].set(id, {
        resolver: resolve,
        rejecter: reject,
      });
    });
  }

  /**
   * Sends a message to the worker.
   * @param {string} type The type of the message
   * @param {...any} args A list of optional arguments.
   */
  [sendMessage](type, ...args) {
    return null;
  }
}
