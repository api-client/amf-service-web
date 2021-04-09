import {
  AmfStoreProxy,
  workerValue,
  sendMessage,
  createWorker,
  responseHandler,
  readWorkerUrl,
} from "./AmfStoreProxy.js";
import { AmfWorkerStoreInit } from "./types.js";

export declare const optionsValue: unique symbol;

export declare class AmfStoreService extends AmfStoreProxy {
  get worker(): Worker;
  [workerValue]: Worker;
  /**
   * Options used to initialize this class.
   */
  get options(): AmfWorkerStoreInit;
  [optionsValue]: AmfWorkerStoreInit;
  eventsTarget: EventTarget;

  /**
   * @param target Events target.
   * @param opts Class initialization options.
   */
  constructor(target?: EventTarget, opts?: AmfWorkerStoreInit);

  /**
   * Initializes the backend store.
   */
  init(): Promise<void>;

  /**
   * Creates an instance of the web worker.
   */
  [createWorker](): Worker;

  /**
   * The worker location in the final build of the app may be anywhere.
   */
  [readWorkerUrl](): string;

  [responseHandler](e: MessageEvent): void;

  /**
   * Sends a message to the worker.
   * @param type The type of the message
   * @param args A list of optional arguments.
   */
  [sendMessage](type: string, ...args: any): Promise<any>;
}
