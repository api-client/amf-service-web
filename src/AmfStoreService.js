/* eslint-disable class-methods-use-this */
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
} from "./AmfStoreProxy.js";

/** @typedef {import('./types').WorkerMessage} WorkerMessage */
/** @typedef {import('./types').WorkerResponse} WorkerResponse */
/** @typedef {import('./types').AmfWorkerStoreInit} AmfWorkerStoreInit */

/** @typedef {import('amf-client-js').model.document.Document} Document */
/** @typedef {import('amf-client-js').model.domain.WebApi} WebApi */
/** @typedef {import('amf-client-js').model.domain.EndPoint} EndPoint */
/** @typedef {import('amf-client-js').model.domain.Operation} Operation */

export const optionsValue = Symbol("options");

export class AmfStoreService extends AmfStoreProxy {
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
    this[optionsValue] = opts;
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
    return this[sendMessage]('init', this.options.amfLocation);
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
