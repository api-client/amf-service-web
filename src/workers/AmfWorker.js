/* eslint-disable class-methods-use-this */
/* global amf */
import { AmfService } from '../AmfService.js';

/** @typedef {import('../types').WorkerMessage} WorkerMessage */
/** @typedef {import('../types').WorkerResponse} WorkerResponse */

let initialized = false;

class AmfWorker {
  /**
   * @param {MessageEvent} e 
   */
  messageHandler(e) {
    const message = /** @type WorkerMessage */ (e.data);
    if (!message.type || typeof message.id !== 'number') {
      process.send({
        error: true,
        message: 'invalid message',
        data: message,
      });
      return;
    }
    const args = message.arguments;
    if (message.type === 'init') {
      this.processTaskResult(this.init(args[0]), message.id);
      return;
    }
    if (message.type === 'hasApi' && !this.service) {
      this.processTaskResult(Promise.resolve(false), message.id);
      return;
    }
    if (typeof this.service[message.type] !== 'function') {
      process.send({
        error: true,
        message: `The ${message.type} is not callable in the store instance`,
      });
      return;
    }
    const promise = this.service[message.type].call(this.service, ...args);
    this.processTaskResult(promise, message.id);
  }

  /**
   * Initializes the AMF by importing the AMF script and initializing the library.
   * @param {string=} amfLocation 
   */
  async init(amfLocation='/amf-bundle.js') {
    if (initialized) {
      return;
    }
    initialized = true;
    await import(amfLocation);
    // @ts-ignore
    amf.plugins.document.WebApi.register();
    // @ts-ignore
    amf.plugins.document.Vocabularies.register();
    // @ts-ignore
    amf.plugins.features.AMFValidation.register();
    // @ts-ignore
    await amf.Core.init();
    // @ts-ignore
    this.service = new AmfService(amf);
  }

  /**
   * @param {Promise} promise 
   * @param {number} id 
   */
  async processTaskResult(promise, id) {
    const response = /** @type WorkerResponse */({
      id,
    });
    try {
      response.result = await promise;
    } catch (e) {
      response.error = true;
      response.message = e.message;
      
      // eslint-disable-next-line no-console
      console.error(e);
    }
    // eslint-disable-next-line no-restricted-globals
    self.postMessage(response);
  }
}

const worker = new AmfWorker();
// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', worker.messageHandler.bind(worker));
