/* eslint-disable class-methods-use-this */

/** @typedef {import('../types').ProxyStatusResponse} ProxyStatusResponse */
/** @typedef {import('../types').ProxyErrorResponse} ProxyErrorResponse */
/** @typedef {import('../types').ProxyRequest} ProxyRequest */
/** @typedef {import('../types').ProxyResponse} ProxyResponse */
/** @typedef {import('../types').WorkerMessage} WorkerMessage */
/** @typedef {import('../types').WorkerResponse} WorkerResponse */

export const baseUriValue = Symbol('baseUriValue');

const baseEndpoint = 'store'
const initSessionEndpoint = `${baseEndpoint}/start-session`;

export class HttpWorker extends EventTarget {
  get baseUri() {
    return this[baseUriValue];
  }

  /**
   * @param {string} baseUri The API base URI.
   * @param {string=} pid The process id, if known.
   */
  constructor(baseUri, pid) {
    super();
    this[baseUriValue] = baseUri;
    /**
     * The process id on the server. To be set when known.
     */
    this.pid = pid;
  }

  /**
   * @param {string} route The path relative to the base URI.
   * @returns {string} The full API endpoint URL.
   */
  getApiUrl(route) {
    const endpointUrl = new URL(route, this.baseUri);
    return endpointUrl.toString();
  }

  /**
   * Sends a message to the API worker.
   * @param {WorkerMessage} message 
   */
  async postMessage(message) {
    if (!this.pid) {
      throw new Error('THe process id is not set.');
    }
    const { id } = message;
    const url = this.getApiUrl(baseEndpoint);
    const data = /** @type ProxyRequest */ ({
      id: this.pid,
      type: message.type,
      args: message.arguments,
    });
    const response = await fetch(url, {
      credentials: "include",
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!response.headers.get('content-type').startsWith('application/json')) {
      this.dispatchEvent(new CustomEvent('message', { 
        detail: {
          error: true,
          message: 'Invalid response from the server.',
        } 
      }));
      return;
    }
    const apiResponse = await response.json();
    const result = /** @type WorkerResponse */({
      id,
    });
    if (apiResponse.error) {
      result.error = apiResponse.error;
      result.message = apiResponse.message;
    } else if (apiResponse.kind !== "AMF#ProxyResponse") {
      result.error = true;
      result.message = 'Unexpected response from the server';
    } else {
      result.result = apiResponse.result;
    }
    this.dispatchEvent(new CustomEvent('message', { detail: result }));
  }

  /**
   * Initializes the session on the server.
   * @returns {Promise<ProxyStatusResponse|ProxyErrorResponse>}
   */
  async initSession() {
    const url = this.getApiUrl(initSessionEndpoint);
    const response = await fetch(url, {
      credentials: "include",
      mode: 'cors',
    });
    if (!response.headers.get('content-type').startsWith('application/json')) {
      throw new Error('Invalid response from the server.');
    }
    return response.json();
  }
}
