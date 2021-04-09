export interface WorkerMessage {
  /**
   * The type of the message. It identifies an operation performed by the worker.
   */
  type: string;
  /**
   * The id of the message to report back.
   */
  id: number;
  /**
   * The list of arguments to be passed to the operation.
   */
  arguments: any[];
}

export interface WorkerResponse {
  /**
   * The id of the request message.
   */
  id: number;
  /**
   * The computation result.
   */
  result: any;
  /**
   * Whether there was an error when computing the value
   */
  error?: boolean;
  /**
   * Error message.
   */
  message?: string;
}

export declare interface AmfWorkerStoreInit {
  /**
   * The path to the web worker location.
   */
  workerLocation?: string;
  /**
   * When set this function is used to create an instance of the web worker.
   * It has to return an instance of a WebWorker.
   */
  createWebWorker?: () => Worker;
  /**
   * The location of the `amd-bundle.js` file.
   * When not set it imports the file from the root location.
   */
  amfLocation?: string;
}

export interface WorkerQueueItem {
  resolver: Function;
  rejecter: Function;
}

export interface ApiInit {
  name?: string;
  description?: string;
  schemes?: string[];
  accepts?: string[];
  contentType?: string[];
  version?: string;
  termsOfService?: string;
}

export interface ApiServerInit {
  url: string;
  description?: string;
  /**
   * The names of variables. This can only be used to create new (empty) variables.
   */
  variables?: string[];
}

export interface EndPointInit {
  description?: string;
  name?: string;
  summary?: string;
  // relativePath?: string;
  path: string;
}

export interface OperationInit {
  method: string;
  name?: string;
  description?: string;
  summary?: string;
  deprecated?: boolean;
  schemes?: string[];
  accepts?: string[];
  contentType?: string[];
}

export interface OperationRequestInit {
  description?: string;
  required?: boolean;
}

export interface OperationResponseInit {
  name: string;
  description?: string;
  statusCode?: string;
  /**
   * List of header names (parameter names) to create
   */
  headers?: string[];
  /**
   * List of mediaTypes of the payloads to create.
   */
  payloads: string[];
}

export interface ApiEndPointListItem {
  /**
   * The domain id of the endpoint.
   * It may be undefined when the endpoint is created "abstract" endpoint vor the visualization.
   */
  id?: string;
  path: string;
  name?: string;
}

export interface ApiEndPointWithOperationsListItem extends ApiEndPointListItem {
  operations: ApiOperationListItem[];
}

export interface ApiEndpointsTreeItem extends ApiEndPointWithOperationsListItem {
  label: string;
  indent: number;
  hasShortPath?: boolean;
  hasChildren?: boolean;
}

export interface ApiEndPoint {
  id: string;
  description?: string;
  name?: string;
  summary?: string;
  relativePath?: string;
  path: string;
  operations: string[];
  parameters: string[];
  payloads: string[];
  servers: string[];
  security: string[];
}

export interface ApiOperation {
  id: string;
  method: string;
  name?: string;
  description?: string;
  summary?: string;
  deprecated: boolean;
  schemes?: string[];
  accepts?: string[];
  contentType?: string[];
  documentation?: string;
  request?: string;
  operationId?: string;
  responses: string[];
  security: string[];
  callbacks: string[];
  servers: string[];
  customDomainProperties: string[];
}

export interface ApiOperationListItem {
  id: string;
  method: string;
  name?: string;
}

export interface ApiServer {
  id: string;
  url: string;
  variables: string[];
  description?: string;
}

export interface ApiParameter {
  id: string;
  description?: string;
  required?: boolean;
  allowEmptyValue?: boolean;
  deprecated?: boolean;
  explode?: boolean;
  allowReserved?: boolean;
  style?: string;
  binding?: string;
  schema?: string;
  payloads?: string[];
  examples?: string[];
}

export interface ApiExample {
  id: string;
  name?: string;
  displayName?: string;
  description?: string;
  value?: string;
  structuredValue?: any;
  strict: boolean;
  mediaType?: string;
}

export interface ApiPayload {
  id: string;
  name?: string;
  mediaType?: string;
  schema?: string;
  examples: string[];
  encoding: string[];
}

export interface ApiResponse {
  id: string;
  name?: string;
  description?: string;
  statusCode?: string;
  headers: string[];
  payloads: string[];
  examples: string[];
  links: string[];
}

export interface ApiTemplatedLink {
  id: string;
  name?: string;
  description?: string;
  template?: string;
  operationId?: string;
  mapping?: string;
  requestBody?: string;
  server?: string;
}

export interface ApiSecurityRequirement {
  id: string;
  name?: string;
  schemes: string[];
}

export interface ApiParametrizedSecurityScheme {
  id: string;
  name?: string;
  scheme?: string;
  settings?: string;
}

export interface ApiSecurityScheme {
  id: string;
  name?: string;
  type?: string;
  displayName?: string;
  description?: string;
  headers: string[];
  queryParameters: string[];
  responses: string[];
  settings?: string;
  queryString?: string;
}

export interface ApiRequest {
  id: string;
  description?: string;
  required?: boolean;
  queryParameters: string[];
  headers: string[];
  payloads: string[];
  queryString?: string;
  uriParameters: string[];
  cookieParameters: string[];
}

export interface ApiCustomDomainProperty {
  id: string;
  name?: string;
  displayName?: string;
  description?: string;
  domain: string[];
  schema?: string;
  isLink: boolean;
  linkTarget?: string;
  linkLabel?: string;
}

export interface ApiSecuritySchemeListItem {
  id: string;
  type: string;
  name?: string;
  displayName?: string;
}

export interface ApiDocumentation {
  id: string;
  url?: string;
  description?: string;
  title?: string;
}

export declare interface ApiNodeShapeListItem {
  id: string;
  name?: string;
  displayName?: string;
}

export interface SerializedApi {
  id: string;
  name?: string;
  description?: string;
  identifier?: string;
  schemes: string[];
  endPoints: string[];
  accepts: string[];
  contentType: string[];
  version?: string;
  termsOfService?: string;
  provider?: string;
  license?: string;
  documentations: string[];
  servers: string[];
  security: string[];
}
