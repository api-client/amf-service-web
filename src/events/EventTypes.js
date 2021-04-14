export const EventTypes = {
  Store: {
    init: 'apistoreinit',
    loadGraph: 'apistoreloadgraph',
  },
  Api: {
    createWebApi: 'apistoreapicreatewebapi',
    generateRaml: 'apistoreapigenerateraml',
    generateGraph: 'apistoreapigenerategraph',
    get: 'apistoreapigetapi',
  },
  Endpoint: {
    add: 'apistoreendpointadd',
    get: 'apistoreendpointget',
    update: 'apistoreendpointupdate',
    delete: 'apistoreendpointdelete',
    list: 'apistoreendpointlist',
    listWithOperations: 'apistoreendpointlistwithops',
    listOperations: 'apistoreendpointoperations',
    State: {
      updated: 'apistoreendpointstateupdate',
      deleted: 'apistoreendpointstatedelete',
      created: 'apistoreendpointstatecreate',
    },
  },
  Operation: {
    add: 'apistoreopadd',
    get: 'apistoreopget',
    update: 'apistoreopupdate',
    delete: 'apistoreopdelete',
    addRequest: 'apistoreopaddrequest',
    addResponse: 'apistoreopaddresponse',
    State: {
      updated: 'apistoreopstateupdate',
      deleted: 'apistoreopstatedelete',
      created: 'apistoreopstatecreate',
    },
  },
  Parameter: {
    get: 'apistoreparamget',
  },
  Example: {
    get: 'apistoreexampleget',
  },
  Payload: {
    get: 'apistorepayloadget',
  },
  Request: {
    get: 'apistorerequestget',
  },
  Response: {
    get: 'apistoreresponseget',
  },
  Documentation: {
    add: 'apistoredocsadd',
    get: 'apistoredocsget',
    update: 'apistoredocsupdate',
    delete: 'apistoredocsdelete',
    list: 'apistoredocslist',
    State: {
      updated: 'apistoredocsstateupdate',
      deleted: 'apistoredocsstatedelete',
      created: 'apistoredocsstatecreate',
    },
  },
  Security: {
    list: 'apistoresecuritylist',
  },
  Server: {
    list: 'apistoreserverslist',
    add: 'apistoreserversadd',
    get: 'apistoreserversget',
  },
  Type: {
    add: 'apistoretypeadd',
    get: 'apistoretypeget',
    update: 'apistoretypeupdate',
    delete: 'apistoretypedelete',
    list: 'apistoretypelist',
    State: {
      updated: 'apistoretypestateupdate',
      deleted: 'apistoretypestatedelete',
      created: 'apistoretypestatecreate',
    },
  },
};

Object.freeze(EventTypes);
Object.freeze(EventTypes.Store);
Object.freeze(EventTypes.Api);
Object.freeze(EventTypes.Endpoint);
Object.freeze(EventTypes.Endpoint.State);
Object.freeze(EventTypes.Operation);
Object.freeze(EventTypes.Operation.State);
Object.freeze(EventTypes.Parameter);
Object.freeze(EventTypes.Example);
Object.freeze(EventTypes.Payload);
Object.freeze(EventTypes.Request);
Object.freeze(EventTypes.Response);
Object.freeze(EventTypes.Documentation);
Object.freeze(EventTypes.Documentation.State);
Object.freeze(EventTypes.Security);
Object.freeze(EventTypes.Server);
Object.freeze(EventTypes.Type);
Object.freeze(EventTypes.Type.State);
