import { AmfStoreDomEventsMixin } from './mixins/AmfStoreDomEventsMixin';
import { StorePersistenceMixin } from './mixins/StorePersistenceMixin';
import {
  AmfStoreProxy,
  workerValue,
  sendMessage,
  createWorker,
  responseHandler,
} from './AmfStoreProxy.js';
import { HttpWorker } from './workers/HttpWorker';
import { AmfHttpWorkerInit } from './types';

export const optionsValue: unique symbol;
export const pidValue: unique symbol;
export const registerSocket: unique symbol;
export const eventSourceValue: unique symbol;
export const registerSocketListeners: unique symbol;
export const socketMessageHandler: unique symbol;

export declare class AmfStoreHttpService extends AmfStoreDomEventsMixin(StorePersistenceMixin(AmfStoreProxy)) {
  get worker(): HttpWorker;
  [workerValue]: HttpWorker;

  /**
   * @returns Options used to initialize this class.
   */
  get options(): AmfHttpWorkerInit;
  [optionsValue]: AmfHttpWorkerInit;

  /**
   * @returns {string|undefined} The current process id for the backend service.
   * This either comes from the class init options or from calling the `init()` function.
   */
  get pid(): string;
  [pidValue]: string;

  eventsTarget: EventTarget;

  /**
   * @param opts Class initialization options.
   */
  constructor(opts: AmfHttpWorkerInit);

  /**
   * Creates an instance of the web worker.
   */
  [createWorker](): HttpWorker;

  /**
   * Initializes the backend store.
   * It creates a new session in the store. Do not call this function when the application
   * should connect to an existing process. Instead initialize the store with the 
   * process id and call the `registerSocket()` function instead.
   */
  init(): Promise<void>;

  /**
   * A function that connects to the server to listen for mutation events.
   * This function is called automatically when calling `init()` function.
   * 
   * Subsequent calls without un-registering previous listeners does nothing.
   * 
   * This function throws an error when the `pid` has not been set either by providing it
   * through the init object or through calling the `init()` function.
   */
  registerSocket(): void;

  /**
   * @param pid The API server process id.
   */
  [registerSocket](pid: string): void;
  [registerSocketListeners](base: any, es: EventSource): void;
  [socketMessageHandler](event: MessageEvent): void;
  /**
   * Sends a message to the worker.
   * @param type The type of the message
   * @param args A list of optional arguments.
   */
  [sendMessage](type: string, ...args: any): Promise<any>;
  [responseHandler](e: any): void;
}
