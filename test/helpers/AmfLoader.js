/** @typedef {import('../../worker.index').AmfStoreService} AmfStoreService */
/** @typedef {import('../../worker.index').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('../../worker.index').ApiParameterRecursive} ApiParameterRecursive */
/** @typedef {import('../../worker.index').ApiRequestRecursive} ApiRequestRecursive */

export class AmfLoader {
  static async loadApi(file='demo-api.json') {
    const url = `${window.location.protocol}//${window.location.host}/demo/${file}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Invalid API location ${file}`);
    }
    const result = await response.text();
    return result;
  }

  /**
   * @param {AmfStoreService} store
   * @param {string} name
   * @returns {Promise<ApiShapeUnion>} 
   */
  static async getShape(store, name) {
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
   * @param {AmfStoreService} store
   * @param {string} endpoint The endpoint path
   * @param {string} operation The operation path
   * @param {string} param The param name
   * @returns {Promise<ApiParameterRecursive>} 
   */
  static async getParameter(store, endpoint, operation, param) {
    const request = await AmfLoader.lookupRequest(store, endpoint, operation);
    /** @type ApiParameterRecursive[] */
    let pool = [];
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
   * @param {AmfStoreService} store
   * @param {string} endpoint The endpoint path
   * @param {string} operation The operation path
   * @returns {Promise<ApiRequestRecursive>} 
   */
  static async lookupRequest(store, endpoint, operation) {
    const op = await store.getOperationRecursive(operation, endpoint);
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
