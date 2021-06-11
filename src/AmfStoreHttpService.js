import { AmfStoreDomEventsMixin } from './mixins/AmfStoreDomEventsMixin.js';
import { StorePersistenceMixin } from './mixins/StorePersistenceMixin.js';
import {
  AmfStoreProxy,
  workerValue,
  createResponsePromise,
  sendMessage,
  getId,
  createWorker,
  responseHandler,
  errorHandler,
  processResponse,
} from './AmfStoreProxy.js';
import { HttpWorker } from './workers/HttpWorker.js';
import { EventTypes } from './events/EventTypes.js';

/** @typedef {import('./types').AmfHttpWorkerInit} AmfHttpWorkerInit */
/** @typedef {import('./types').ProxyStatusResponse} ProxyStatusResponse */
/** @typedef {import('./types').ProxyErrorResponse} ProxyErrorResponse */
/** @typedef {import('./types').WorkerResponse} WorkerResponse */

export const optionsValue = Symbol('optionsValue');
export const pidValue = Symbol('pidValue');
export const registerSocket = Symbol('registerSocket');
export const eventSourceValue = Symbol('eventSourceValue');
export const registerSocketListeners = Symbol('registerSocketListeners');
export const socketMessageHandler = Symbol('socketMessageHandler');

export class AmfStoreHttpService extends AmfStoreDomEventsMixin(StorePersistenceMixin(AmfStoreProxy)) {
  /**
   * @type {HttpWorker}
   */
  get worker() {
    if (!this[workerValue]) {
      this[workerValue] = this[createWorker]();
    }
    return this[workerValue];
  }

  /**
   * @returns {AmfHttpWorkerInit} Options used to initialize this class.
   */
  get options() {
    return this[optionsValue];
  }

  /**
   * @returns {string|undefined} The current process id for the backend service.
   * This either comes from the class init options or from calling the `init()` function.
   */
  get pid() {
    return this[pidValue];
  }

  /**
   * @param {AmfHttpWorkerInit} opts Class initialization options.
   */
  constructor(opts) {
    super();
    /**
     * @type {AmfHttpWorkerInit}
     */
    this[optionsValue] = Object.freeze(opts);
    /**
     * @type {HttpWorker}
     */
    this[workerValue] = undefined;
    this.eventsTarget = opts.eventsTarget || window;
    if (opts.pid) {
      this[pidValue] = opts.pid;
    }

    this[socketMessageHandler] = this[socketMessageHandler].bind(this);
  }

  /**
   * Creates an instance of the web worker.
   */
  [createWorker]() {
    const { options } = this;
    const { baseUri } = options;
    const worker = new HttpWorker(baseUri, this[pidValue]);
    worker.addEventListener('message', this[responseHandler]);
    worker.addEventListener('error', this[errorHandler]);
    return worker;
  }

  /**
   * Initializes the backend store.
   * It creates a new session in the store. Do not call this function when the application
   * should connect to an existing process. Instead initialize the store with the 
   * process id and call the `registerSocket()` function instead.
   * 
   * @return {Promise<void>}
   */
  async init() {
    const result = await this.worker.initSession();
    const typedError = /** @type ProxyErrorResponse */ (result);
    if (typedError.error) {
      throw new Error(typedError.message);
    }
    const typedResponse = /** @type ProxyStatusResponse */ (result);
    if (!typedResponse.id) {
      throw new Error('The sever did not return the process id.');
    }
    this[pidValue] = typedResponse.id;
    this[workerValue].pid = typedResponse.id;
    this[registerSocket](typedResponse.id);
  }

  /**
   * A function that connects to the server to listen for mutation events.
   * This function is called automatically when calling `init()` function.
   * 
   * Subsequent calls without un-registering previous listeners does nothing.
   * 
   * This function throws an error when the `pid` has not been set either by providing it
   * through the init object or through calling the `init()` function.
   */
  registerSocket() {
    const { pid } = this;
    if (!pid) {
      throw new Error('The server process id is not set. Call the init() function first.');
    }
    if (this[eventSourceValue]) {
      return;
    }
    this[registerSocket](pid);
  }

  /**
   * @param {string} pid The API server process id.
   */
  [registerSocket](pid) {
    const { options } = this;
    const { baseUri } = options;
    const endpointUrl = new URL(`store/events/${pid}`, baseUri);
    const source = new EventSource(endpointUrl.toString(), { withCredentials: true } );
    this[eventSourceValue] = source;
    this[registerSocketListeners](EventTypes.Documentation.State, source);
    this[registerSocketListeners](EventTypes.Endpoint.State, source);
    this[registerSocketListeners](EventTypes.Example.State, source);
    this[registerSocketListeners](EventTypes.Operation.State, source);
    this[registerSocketListeners](EventTypes.Parameter.State, source);
    this[registerSocketListeners](EventTypes.Payload.State, source);
    this[registerSocketListeners](EventTypes.Request.State, source);
    this[registerSocketListeners](EventTypes.Response.State, source);
    this[registerSocketListeners](EventTypes.Server.State, source);
    this[registerSocketListeners](EventTypes.Type.State, source);
  }

  /**
   * @param {object} base 
   * @param {EventSource} es 
   */
  [registerSocketListeners](base, es) {
    Object.keys(base).forEach((key) => {
      if (typeof key === 'string') {
        es.addEventListener(base[key], this[socketMessageHandler]);
      }
    });
  }

  /**
   * @param {MessageEvent} event 
   */
  [socketMessageHandler](event) {
    const changeRecord = JSON.parse(event.data);
    const e = new CustomEvent(event.type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: changeRecord,
    });
    this.eventsTarget.dispatchEvent(e);
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

  /**
   * @param {any} e
   */
  [responseHandler](e) {
    const result = /** @type WorkerResponse */ (e.detail);
    this[processResponse](result);
  }
}
