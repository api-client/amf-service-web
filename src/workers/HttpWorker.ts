import { ProxyErrorResponse, ProxyRequest, ProxyStatusResponse, WorkerMessage, WorkerResponse } from "../types.js";

export const baseUriValue = Symbol('baseUriValue');

const baseEndpoint = 'store'
const initSessionEndpoint = `${baseEndpoint}/start-session`;

export class HttpWorker extends EventTarget {
  [baseUriValue]: string;

  /**
   * The process id on the server. To be set when known.
   */
  pid?: string;

  get baseUri(): string {
    return this[baseUriValue];
  }

  /**
   * @param baseUri The API base URI.
   * @param pid The process id, if known.
   */
  constructor(baseUri: string, pid?: string) {
    super();
    this[baseUriValue] = baseUri;
    this.pid = pid;
  }

  /**
   * @param route The path relative to the base URI.
   * @returns The full API endpoint URL.
   */
  getApiUrl(route: string): string {
    const endpointUrl = new URL(route, this.baseUri);
    return endpointUrl.toString();
  }

  /**
   * Sends a message to the API worker.
   */
  async postMessage(message: WorkerMessage): Promise<void> {
    if (!this.pid) {
      throw new Error('THe process id is not set.');
    }
    const { id } = message;
    const url = this.getApiUrl(baseEndpoint);
    const data: ProxyRequest = {
      id: this.pid,
      type: message.type,
      args: message.arguments,
    };
    const response = await fetch(url, {
      credentials: "include",
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
    const ct = response.headers.get('content-type');
    if (!ct) {
      this.dispatchEvent(new CustomEvent('message', {
        detail: {
          error: true,
          message: 'Invalid response from the server. Missing content-type header.',
        }
      }));
      return;
    }
    if (!ct.startsWith('application/json')) {
      this.dispatchEvent(new CustomEvent('message', {
        detail: {
          error: true,
          message: 'Invalid response from the server. Unknown content-type.',
        }
      }));
      return;
    }
    const apiResponse = await response.json();
    const result: WorkerResponse = {
      id,
      result: undefined,
    };
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
   */
  async initSession(): Promise<ProxyStatusResponse | ProxyErrorResponse> {
    const url = this.getApiUrl(initSessionEndpoint);
    const response = await fetch(url, {
      credentials: "include",
      mode: 'cors',
    });
    const ct = response.headers.get('content-type');
    if (!ct) {
      throw new Error('Invalid response from the server. Missing content-type header.');
    }
    if (!ct.startsWith('application/json')) {
      throw new Error('Invalid response from the server. Unknown content-type.');
    }
    return response.json();
  }
}
