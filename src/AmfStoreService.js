/* eslint-disable class-methods-use-this */
import { ns } from '@api-components/amf-helper-mixin/src/Namespace.js';
import {
  AmfStoreProxy,
  workerValue,
  createResponsePromise,
  sendMessage,
  getId,
  createWorker,
  responseHandler,
  errorHandler,
  readWorkerUrl,
  processResponse,
} from './AmfStoreProxy.js';
import { AmfStoreDomEventsMixin } from './mixins/AmfStoreDomEventsMixin.js';
import { StorePersistenceMixin } from './mixins/StorePersistenceMixin.js';
import { ApiStoreStateCreateEvent, ApiStoreStateDeleteEvent, ApiStoreStateUpdateEvent } from './events/BaseEvents.js';
import { EventTypes } from './events/EventTypes.js';

/** @typedef {import('./types').WorkerMessage} WorkerMessage */
/** @typedef {import('./types').WorkerResponse} WorkerResponse */
/** @typedef {import('./types').AmfWorkerStoreInit} AmfWorkerStoreInit */
/** @typedef {import('./types').EndPointInit} EndPointInit */
/** @typedef {import('./types').OperationInit} OperationInit */
/** @typedef {import('./types').DocumentationInit} DocumentationInit */
/** @typedef {import('./types').ApiDocumentation} ApiDocumentation */
/** @typedef {import('./types').ShapeInit} ShapeInit */
/** @typedef {import('./types').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('./types').ApiEndPoint} ApiEndPoint */
/** @typedef {import('./types').ApiOperation} ApiOperation */
/** @typedef {import('./events/BaseEvents').ApiStoreCreateRecord} ApiStoreCreateRecord */
/** @typedef {import('./events/BaseEvents').ApiStoreDeleteRecord} ApiStoreDeleteRecord */
/** @typedef {import('./events/BaseEvents').ApiStoreChangeRecord} ApiStoreChangeRecord */

/** @typedef {import('amf-client-js').model.document.Document} Document */
/** @typedef {import('amf-client-js').model.domain.WebApi} WebApi */
/** @typedef {import('amf-client-js').model.domain.EndPoint} EndPoint */
/** @typedef {import('amf-client-js').model.domain.Operation} Operation */

export const optionsValue = Symbol('options');

export class AmfStoreService extends AmfStoreDomEventsMixin(StorePersistenceMixin(AmfStoreProxy)) {
  /**
   * @type {Worker}
   */
  get worker() {
    if (!this[workerValue]) {
      this[workerValue] = this[createWorker]();
    }
    return this[workerValue];
  }

  /**
   * Options used to initialize this class.
   */
  get options() {
    return this[optionsValue];
  }

  /**
   * @param {EventTarget=} [target=window] Events target.
   * @param {AmfWorkerStoreInit=} [opts={}] Class initialization options.
   */
  constructor(target = window, opts = {}) {
    super();
    /**
     * @type {AmfWorkerStoreInit}
     */
    this[optionsValue] = Object.freeze(opts);
    /**
     * @type {Worker}
     */
    this[workerValue] = undefined;
    this.eventsTarget = target;
  }

  /**
   * Initializes the backend store.
   * @return {Promise<void>}
   */
  async init() {
    await this[sendMessage]('init', this.options.amfLocation);
  }

  /**
   * Adds a new endpoint to the API and returns generated id for the endpoint.
   * @param {EndPointInit} init EndPoint init parameters
   * @returns {Promise<ApiEndPoint>}
   */
  async addEndpoint(init) {
    const endpoint = await super.addEndpoint(init);
    const record = /** @type ApiStoreCreateRecord */ ({
      graphId: endpoint.id,
      domainType: ns.aml.vocabularies.apiContract.EndPoint,
      item: endpoint,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Endpoint.State.created, record));
    this.persist();
    return endpoint;
  }

  /**
   * Removes endpoint from the API.
   * @param {string} id The endpoint domain id.
   * @returns {Promise<void>}
   */
  async deleteEndpoint(id) {
    await super.deleteEndpoint(id);
    const record = /** @type ApiStoreDeleteRecord */ ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.EndPoint,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Endpoint.State.deleted, record));
    this.persist();
  }

  /**
   * Updates a scalar property of an endpoint.
   * @param {string} id The domain id of the endpoint.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiEndPoint>}
   */
  async updateEndpointProperty(id, property, value) {
    const endpoint = await super.updateEndpointProperty(id, property, value);
    const record = /** @type ApiStoreChangeRecord */ ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.EndPoint,
      item: endpoint,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Endpoint.State.updated, record));
    this.persist();
    return endpoint;
  }

  /**
   * Adds an empty operation to an endpoint.
   * @param {string} pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param {OperationInit} init The operation initialize options
   * @returns {Promise<ApiOperation>}
   */
  async addOperation(pathOrId, init) {
    const operation = await super.addOperation(pathOrId, init);
    const endpoint = await this.getEndpoint(pathOrId);
    const record = /** @type ApiStoreCreateRecord */ ({
      graphId: operation.id,
      domainType: ns.aml.vocabularies.apiContract.Operation,
      item: operation,
      domainParent: endpoint.id,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Operation.State.created, record));
    this.persist();
    return operation;
  }

  /**
   * Removes an operation from the graph.
   * @param {string} id The operation id to remove.
   * @returns {Promise<string|undefined>} The id of the affected endpoint. Undefined when operation or endpoint cannot be found.
   */
  async deleteOperation(id) {
    const result = await super.deleteOperation(id);
    const record = /** @type ApiStoreDeleteRecord */ ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.Operation,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Operation.State.deleted, record));
    this.persist();
    return result;
  }

  /**
   * Updates a scalar property of an operation.
   * @param {string} id The domain id of the operation.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiOperation>}
   */
  async updateOperationProperty(id, property, value) {
    const updated = await super.updateOperationProperty(id, property, value);
    const record = /** @type ApiStoreChangeRecord */ ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.Operation,
      item: updated,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Operation.State.updated, record));
    this.persist();
    return updated;
  }

  /**
   * Adds a new documentation object to the graph.
   * @param {DocumentationInit} init The initialization properties
   * @returns {Promise<ApiDocumentation>} The created documentation.
   */
  async addDocumentation(init) {
    const doc = await super.addDocumentation(init);
    const record = /** @type ApiStoreCreateRecord */ ({
      graphId: doc.id,
      domainType: ns.aml.vocabularies.core.CreativeWork,
      item: doc,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Documentation.State.created, record));
    this.persist();
    return doc;
  }

  /**
   * Updates a scalar property of a documentation.
   * @param {string} id The domain id of the documentation.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiDocumentation>}
   */
  async updateDocumentationProperty(id, property, value) {
    const updated = await super.updateDocumentationProperty(id, property, value);
    const record = /** @type ApiStoreChangeRecord */ ({
      graphId: id,
      domainType: ns.aml.vocabularies.core.CreativeWork,
      item: updated,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Documentation.State.updated, record));
    this.persist();
    return updated;
  }

  /**
   * Removes the documentation from the graph.
   * @param {string} id The domain id of the documentation object
   */
  async deleteDocumentation(id) {
    await super.deleteDocumentation(id);
    const record = /** @type ApiStoreDeleteRecord */ ({
      graphId: id,
      domainType: ns.aml.vocabularies.core.CreativeWork,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Documentation.State.deleted, record));
    this.persist();
  }

  /**
   * Creates a new type in the API.
   * @param {ShapeInit=} init The Shape init options.
   * @returns {Promise<ApiShapeUnion>}
   */
  async addType(init) {
    const result = await super.addType(init);
    const record = /** @type ApiStoreCreateRecord */ ({
      graphId: result.id,
      domainType: result.types[0],
      item: result,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Type.State.created, record));
    this.persist();
    return result;
  }

  /**
   * Removes a type for a given domain id.
   * @param {string} id The type domain id.
   */
  async deleteType(id) {
    const type = await this.getType(id);
    const result = await super.deleteType(id);
    if (!result) {
      return false;
    }
    const record = /** @type ApiStoreDeleteRecord */ ({
      graphId: id,
      domainType: type.types[0],
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Type.State.deleted, record));
    this.persist();
    return true;
  }

  /**
   * Updates a scalar property of a type.
   * @param {string} id The domain id of the type.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiShapeUnion>}
   */
  async updateTypeProperty(id, property, value) {
    const type = await super.updateTypeProperty(id, property, value);
    const record = /** @type ApiStoreChangeRecord */ ({
      graphId: id,
      domainType: type.types[0],
      item: type,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Type.State.updated, record));
    this.persist();
    return type;
  }

  /**
   * Creates an instance of the web worker.
   */
  [createWorker]() {
    const { options } = this;
    let worker;
    if (typeof options.createWebWorker === 'function') {
      worker = options.createWebWorker();
    } else {
      const url =
        typeof options.workerLocation === 'string'
          ? options.workerLocation
          : this[readWorkerUrl]();
      worker = new Worker(url, {
        type: 'module',
        name: 'AmfServiceWorker',
      });
    }
    worker.addEventListener('message', this[responseHandler]);
    worker.addEventListener('error', this[errorHandler]);
    return worker;
  }

  /**
   * The worker location in the final build of the app may be anywhere.
   * @returns {string}
   */
  [readWorkerUrl]() {
    // @ts-ignore
    const cnf = /** @type any */ (window.AmfService);
    if (cnf && cnf.workers && cnf.workers.workerStore) {
      return cnf.workers.workerStore;
    }
    return new URL('workers/AmfWorker.js', import.meta.url).toString();
  }

  /**
   * @param {MessageEvent} e
   */
  [responseHandler](e) {
    const result = /** @type WorkerResponse */ (e.data);
    this[processResponse](result);
  }

  /**
   * Sends a message to the worker.
   * @param {string} type The type of the message
   * @param {...any} args A list of optional arguments.
   */
  [sendMessage](type, ...args) {
    const { worker } = this;
    const id = this[getId]();
    const result = this[createResponsePromise](id);
    const message = /** @type WorkerMessage */ ({
      id,
      type,
      arguments: args,
    });
    worker.postMessage(message);
    return result;
  }
}
