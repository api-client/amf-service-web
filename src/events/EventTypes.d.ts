/**
 * Events types definition.
 */
declare interface EventTypes {
  Store: Readonly<StoreEvents>;
  Api: Readonly<ApiEvents>;
  Endpoint: Readonly<EndpointEvents>;
  Operation: Readonly<OperationEvents>;
  Parameter: Readonly<ParameterEvents>;
  Example: Readonly<ExampleEvents>;
  Payload: Readonly<PayloadEvents>;
  Request: Readonly<RequestEvents>;
  Response: Readonly<ResponseEvents>;
  Documentation: Readonly<DocumentationEvents>;
  Security: Readonly<SecurityEvents>;
  Server: Readonly<ServerEvents>;
  Type: Readonly<TypeEvents>;
}

export const EventTypes: Readonly<EventTypes>;

declare interface StoreEvents {
  init: string;
  loadGraph: string;
}
declare interface ApiEvents {
  createWebApi: string;
  generateRaml: string;
  generateGraph: string;
  get: string;
}
declare interface EndpointEvents {
  add: string;
  get: string;
  update: string;
  delete: string;
  list: string;
  listWithOperations: string;
  listOperations: string;
  addOperation: string;
  removeOperation: string;
  State: Readonly<StateCUD>;
}
declare interface OperationEvents {
  get: string;
  update: string;
  addRequest: string;
  removeRequest: string;
  addResponse: string;
  removeResponse: string;
  getParent: string;
  State: Readonly<StateCUD>;
}
declare interface ParameterEvents {
  get: string;
  update: string;
  addExample: string;
  removeExample: string;
  State: Readonly<StateCUD>;
}
declare interface ExampleEvents {
  get: string;
  update: string;
  State: Readonly<StateCUD>;
}
declare interface PayloadEvents {
  get: string;
  update: string;
  addExample: string;
  removeExample: string;
  State: Readonly<StateCUD>;
}
declare interface RequestEvents {
  get: string;
  update: string;
  addPayload: string;
  removePayload: string;
  addHeader: string;
  removeHeader: string;
  addQueryParameter: string;
  removeQueryParameter: string;
  addCookieParameter: string;
  removeCookieParameter: string;
  State: Readonly<StateCUD>;
}
declare interface ResponseEvents {
  get: string;
  update: string;
  addHeader: string;
  removeHeader: string;
  addPayload: string;
  removePayload: string;
  State: Readonly<StateCUD>;
}
declare interface DocumentationEvents {
  add: string;
  get: string;
  update: string;
  delete: string;
  list: string;
  State: Readonly<StateCUD>;
}
declare interface SecurityEvents {
  list: string;
}
declare interface ServerEvents {
  list: string;
  add: string;
  get: string;
  State: Readonly<StateCUD>;
}
declare interface TypeEvents {
  add: string;
  get: string;
  update: string;
  delete: string;
  list: string;
  State: Readonly<StateCUD>;
}

declare interface StateCUD {
  updated: string;
  deleted: string;
  created: string;
}
