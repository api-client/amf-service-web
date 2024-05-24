import { StoreDomEventsHandler } from '../lib/StoreDomEventsHandler.js';
import { StorePersistence } from '../lib/StorePersistence.js';
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
import { HttpWorker } from '../workers/HttpWorker.js';
import { EventTypes } from '../events/EventTypes.js';
import type { AmfHttpWorkerInit, ProxyErrorResponse, ProxyStatusResponse, WorkerMessage, WorkerResponse } from '../types.js';

export const optionsValue = Symbol('optionsValue');
export const pidValue = Symbol('pidValue');
export const registerSocket = Symbol('registerSocket');
export const eventSourceValue = Symbol('eventSourceValue');
export const registerSocketListeners = Symbol('registerSocketListeners');
export const socketMessageHandler = Symbol('socketMessageHandler');

export class AmfStoreHttpService extends AmfStoreProxy {
  events: StoreDomEventsHandler;
  eventsTarget: EventTarget;
  persistance: StorePersistence;

  [eventSourceValue]?: EventSource;

  [workerValue]?: HttpWorker;

  override get worker(): HttpWorker {
    if (!this[workerValue]) {
      this[workerValue] = this[createWorker]();
    }
    return this[workerValue];
  }

  [optionsValue]: AmfHttpWorkerInit;


  /**
   * Options used to initialize this class.
   */
  get options(): AmfHttpWorkerInit {
    return this[optionsValue];
  }

  [pidValue]: string|undefined;

  /**
   * The current process id for the backend service.
   * This either comes from the class init options or from calling the `init()` function.
   */
  get pid(): string|undefined {
    return this[pidValue];
  }

  /**
   * @param opts Class initialization options.
   */
  constructor(persistance: StorePersistence, opts: AmfHttpWorkerInit) {
    super();
    this[optionsValue] = Object.freeze(opts);
    
    this.eventsTarget = opts.eventsTarget || window;
    this.persistance = persistance;
    this.events = new StoreDomEventsHandler(this, this.eventsTarget);

    if (opts.pid) {
      this[pidValue] = opts.pid;
    }

    this[socketMessageHandler] = this[socketMessageHandler].bind(this);
  }

  /**
   * Creates an instance of the web worker.
   */
  [createWorker](): HttpWorker {
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
   */
  override async init(): Promise<void> {
    const result = await this.worker.initSession();
    const typedError = result as ProxyErrorResponse;
    if (typedError.error) {
      throw new Error(typedError.message);
    }
    const typedResponse = result as ProxyStatusResponse;
    if (!typedResponse.id) {
      throw new Error('The sever did not return the process id.');
    }
    this[pidValue] = typedResponse.id;
    this.worker.pid = typedResponse.id;
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
  registerSocket(): void {
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
   * @param pid The API server process id.
   */
  [registerSocket](pid: string): void {
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

  [registerSocketListeners](base: Record<string, string>, es: EventSource): void {
    Object.keys(base).forEach((key) => {
      if (typeof key === 'string') {
        es.addEventListener(base[key], this[socketMessageHandler]);
      }
    });
  }

  [socketMessageHandler](event: MessageEvent): void {
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
   * @param type The type of the message
   * @param args A list of optional arguments.
   */
  [sendMessage](type: string, ...args: unknown[]): Promise<unknown> {
    const { worker } = this;
    const id = this[getId]();
    const result = this[createResponsePromise](id);
    const message: WorkerMessage = ({
      id,
      type,
      arguments: args,
    });
    worker.postMessage(message);
    return result;
  }

  [responseHandler](e: Event): void {
    const event = e as CustomEvent<WorkerResponse>;
    this[processResponse](event.detail);
  }
}
