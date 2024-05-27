/* eslint-disable @typescript-eslint/no-explicit-any */
/* global amf */
import type { WorkerMessage, WorkerResponse } from '../types.js';
import { AmfService } from '../service/AmfService.js';

let initialized = false;

class AmfWorker {
  service?: AmfService;

  messageHandler(e: MessageEvent): void {
    // if (!process || !process.send) {
    //   return;
    // }
    const message = e.data as WorkerMessage;
    if (!message.type || typeof message.id !== 'number') {
      throw new Error(`invalid message`);
      // process.send({
      //   error: true,
      //   message: 'invalid message',
      //   data: message,
      // });
      return;
    }
    const { service } = this;
    const args = message.arguments;
    if (message.type === 'init') {
      this.processTaskResult(this.init(args[0] as string), message.id);
      return;
    }
    if (message.type === 'hasApi' && !service) {
      this.processTaskResult(Promise.resolve(false), message.id);
      return;
    }
    if (!service) {
      this.processTaskResult(Promise.reject(new Error(
        'The service is not initialized',
      )), message.id);
      return;
    }

    if (typeof (service as any)[message.type] !== 'function') {
      this.processTaskResult(Promise.reject(new Error(
        `The ${message.type} is not callable in the store instance`,
      )), message.id);
      // process.send({
      //   error: true,
      //   message: `The ${message.type} is not callable in the store instance`,
      // });
      return;
    }
    let promise: Promise<any>;
    try {
      promise = (service as any)[message.type].call(this.service, ...args);
    } catch (cause) {
      promise = Promise.reject(cause);
    }
    this.processTaskResult(promise, message.id);
  }

  /**
   * Initializes the AMF by importing the AMF script and initializing the library.
   */
  async init(amfLocation = '/amf-bundle.js'): Promise<void> {
    if (initialized) {
      return;
    }
    initialized = true;
    await import(amfLocation);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.service = new AmfService(amf);
  }

  async processTaskResult(promise: Promise<any>, id: number): Promise<void> {
    const response: WorkerResponse = {
      id,
      result: undefined,
    };
    try {
      response.result = await promise;
    } catch (e) {
      const error = e as Error;
      response.error = true;
      response.message = error.message;
      response.stack = error.stack;
      
      // eslint-disable-next-line no-console
      console.error(e);
    }
    self.postMessage(response);
  }
}

const worker = new AmfWorker();
self.addEventListener('message', worker.messageHandler.bind(worker));
