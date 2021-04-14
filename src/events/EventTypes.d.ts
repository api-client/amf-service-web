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
declare interface EndpointEvents extends EventsCRUD {
  list: string;
  listWithOperations: string;
  listOperations: string;
  State: Readonly<StateCUD>;
}
declare interface OperationEvents extends EventsCRUD {
  updateOperationProperty: string;
  addRequest: string;
  addResponse: string;
  State: Readonly<StateCUD>;
}
declare interface ParameterEvents {
  get: string;
}
declare interface ExampleEvents {
  get: string;
}
declare interface PayloadEvents {
  get: string;
}
declare interface RequestEvents {
  get: string;
}
declare interface ResponseEvents {
  get: string;
}
declare interface DocumentationEvents extends EventsCRUD {
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
}
declare interface TypeEvents extends EventsCRUD {
  list: string;
  State: Readonly<StateCUD>;
}

declare interface StateCUD {
  updated: string;
  deleted: string;
  created: string;
}

declare interface EventsCRUD {
  add: string;
  get: string;
  update: string;
  delete: string;
}
