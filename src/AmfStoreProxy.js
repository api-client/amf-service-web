/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/** @typedef {import('./types').WorkerResponse} WorkerResponse */
/** @typedef {import('./types').WorkerQueueItem} WorkerQueueItem */
/** @typedef {import('./types').ApiInit} ApiInit */
/** @typedef {import('./types').EndPointInit} EndPointInit */
/** @typedef {import('./types').OperationInit} OperationInit */
/** @typedef {import('./types').OperationRequestInit} OperationRequestInit */
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
   * @param {string} model
   * @returns {Promise<void>}
   */
  loadGraph(model) {
    return this[sendMessage]('loadGraph', model);
  }

  /**
   * Creates new Document in the graph.
   * @param {ApiInit=} init Api init options
   * @returns {Promise<string>} The domain id of the created document
   */
  async createWebApi(init) {
    return this[sendMessage]('createWebApi', init);
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
   * @returns {Promise<string>} The domain id of the created server.
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
   * @returns {Promise<string>}
   */
  async addEndpoint(init) {
    return this[sendMessage]('addEndpoint', init);
  }

  /**
   * Removes endpoint from the API.
   * @param {string} id The endpoint domain id.
   * @returns {Promise<string>} The id of the removed endpoint or undefined if the endpoint is not in the graph.
   */
  async deleteEndpoint(id) {
    return this[sendMessage]('deleteEndpoint', id);
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
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   */
  async updateEndpointProperty(id, property, value) {
    return this[sendMessage]('updateEndpointProperty', id, property, value);
  }

  /**
   * Adds an empty operation to an endpoint.
   * @param {string} pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param {OperationInit} init The operation initialize options
   * @returns {Promise<string>}
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
   * @returns {Promise<string>} The id of the removed operation or undefined if operation is not in the graph.
   */
  async deleteOperation(id) {
    return this[sendMessage]('deleteOperation', id);
  }

  /**
   * Updates a scalar property of an operation.
   * @param {string} id The domain id of the operation.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   */
  async updateOperationProperty(id, property, value) {
    return this[sendMessage]('updateOperationProperty', id, property, value);
  }

  /**
   * @param {string} operationId The operation domain id
   * @param {OperationRequestInit=} init The request init options. Optional.
   * @returns {Promise<string>} The domain id of the created request
   */
  async addRequest(operationId, init) {
    return this[sendMessage]('addRequest', operationId, init);
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
   * Reads example value from the store.
   * @param {string} id The id of the example to read.
   * @returns {Promise<ApiExample>}
   */
  async getExample(id) {
    return this[sendMessage]('getExample', id);
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
   * Reads the response data from the graph.
   * @param {string} id The domain id of the response.
   * @returns {Promise<ApiResponse>}
   */
  async getResponse(id) {
    return this[sendMessage]('getResponse', id);
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
   * Reads the CustomDomainProperty object from the graph.
   * @param {string} id The domain id of the CustomDomainProperty
   * @returns {Promise<ApiCustomDomainProperty>}
   */
  async getCustomDomainProperty(id) {
    return this[sendMessage]('getCustomDomainProperty', id);
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
   * Lists the documentation definitions for the API.
   * @returns {Promise<ApiDocumentation[]>}
   */
  async listDocumentations() {
    return this[sendMessage]('listDocumentations');
  }

  /**
   * Lists the type (schema) definitions for the API.
   * @returns {Promise<ApiNodeShapeListItem[]>}
   */
  async listTypes() {
    return this[sendMessage]('listTypes');
  }

  /**
   * Lists the security definitions for the API.
   * @returns {Promise<ApiSecuritySchemeListItem[]>}
   */
  async listSecurity() {
    return this[sendMessage]('listSecurity');
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
