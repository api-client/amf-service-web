import type { AmfShapes, ApiDefinitions } from "@api-client/core/build/esm/browser.js";
import type { WebWorkerService } from "../../src/worker.index.js";

export class AmfLoader {
  static async loadApi(file = 'demo-api.json') {
    const url = `${window.location.protocol}//${window.location.host}/demo/${file}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Invalid API location ${file}`);
    }
    const result = await response.text();
    return result;
  }

  static async getShape(store: WebWorkerService, name: string): Promise<AmfShapes.IShapeUnion> {
    const types = await store.listTypes();
    const item = types.find(t => t.name === name);
    if (!item) {
      throw new Error(`The shape ${name} does not exist in the API.`);
    }
    return store.getType(item.id);
  }

  /**
   * Reads a request parameter from an operation for: URI, query params, headers, and cookies.
   * 
   * @param endpoint The endpoint path
   * @param operation The operation path
   * @param param The param name
   */
  static async getParameter(store: WebWorkerService, endpoint: string, operation: string, param: string): Promise<ApiDefinitions.IApiParameter> {
    const request = await AmfLoader.lookupRequest(store, endpoint, operation);
    let pool: ApiDefinitions.IApiParameter[] = [];
    if (Array.isArray(request.uriParameters)) {
      pool = pool.concat(request.uriParameters);
    }
    if (Array.isArray(request.cookieParameters)) {
      pool = pool.concat(request.cookieParameters);
    }
    if (Array.isArray(request.queryParameters)) {
      pool = pool.concat(request.queryParameters);
    }
    if (Array.isArray(request.headers)) {
      pool = pool.concat(request.headers);
    }
    const result = pool.find(i => i.name === param);
    if (!result) {
      throw new Error(`Parameter ${param} not found.`);
    }
    return result;
  }

  /**
   * Reads the request object from the graph
   * 
   * @param endpoint The endpoint path
   * @param operation The operation path
   */
  static async lookupRequest(store: WebWorkerService, endpoint: string, operation: string): Promise<ApiDefinitions.IApiRequest> {
    const op = await store.getOperation(operation, endpoint);
    if (!op) {
      throw new Error(`The operation ${operation} of endpoint ${endpoint} does not exist.`);
    }
    const { request } = op;
    if (!request) {
      throw new Error(`The operation ${operation} of endpoint ${endpoint} has no request.`);
    }
    return request;
  }
};
