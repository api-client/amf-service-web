import { assert } from '@open-wc/testing';
import { StoreEventTypes } from  '../../worker.index.js';
import { ensureUnique } from '../helpers/EventHelper.js';

describe('StoreEventTypes', () => {
  describe('Store', () => {
    it('has Store namespace', () => {
      assert.typeOf(StoreEventTypes.Store, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Store = { read: '' };
      });
    });

    [
      ['init', 'apistoreinit'],
      ['loadGraph', 'apistoreloadgraph'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Store[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Store', StoreEventTypes.Store);
    });
  });

  describe('Api', () => {
    it('has Api namespace', () => {
      assert.typeOf(StoreEventTypes.Api, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Api = { read: '' };
      });
    });

    [
      ['createWebApi', 'apistoreapicreatewebapi'],
      ['generateRaml', 'apistoreapigenerateraml'],
      ['generateGraph', 'apistoreapigenerategraph'],
      ['get', 'apistoreapigetapi'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Api[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Api', StoreEventTypes.Api);
    });
  });

  describe('Endpoint', () => {
    it('has Endpoint namespace', () => {
      assert.typeOf(StoreEventTypes.Endpoint, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Endpoint = { read: '' };
      });
    });

    [
      ['add', 'apistoreendpointadd'],
      ['get', 'apistoreendpointget'],
      ['update', 'apistoreendpointupdate'],
      ['delete', 'apistoreendpointdelete'],
      ['list', 'apistoreendpointlist'],
      ['listWithOperations', 'apistoreendpointlistwithops'],
      ['listOperations', 'apistoreendpointoperations'],
      ['addOperation', 'apistoreendpointaddoperation'],
      ['removeOperation', 'apistoreendpointremoveoperation'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Endpoint[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Endpoint', StoreEventTypes.Endpoint);
    });
  });

  describe('Endpoint.State', () => {
    it('has Endpoint.State namespace', () => {
      assert.typeOf(StoreEventTypes.Endpoint.State, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Endpoint.State = { read: '' };
      });
    });

    [
      ['updated', 'apistoreendpointstateupdate'],
      ['deleted', 'apistoreendpointstatedelete'],
      ['created', 'apistoreendpointstatecreate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Endpoint.State[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Endpoint.State', StoreEventTypes.Endpoint.State);
    });
  });

  describe('Operation', () => {
    it('has Operation namespace', () => {
      assert.typeOf(StoreEventTypes.Operation, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Operation = { read: '' };
      });
    });

    [
      ['get', 'apistoreopget'],
      ['update', 'apistoreopupdate'],
      ['addRequest', 'apistoreopaddrequest'],
      ['removeRequest', 'apistoreopremoverequest'],
      ['addResponse', 'apistoreopaddresponse'],
      ['removeResponse', 'apistoreopremoveresponse'],
      ['getParent', 'apistoreopgetparent'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Operation[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Operation', StoreEventTypes.Operation);
    });
  });

  describe('Operation.State', () => {
    it('has Operation.State namespace', () => {
      assert.typeOf(StoreEventTypes.Operation.State, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Operation.State = { read: '' };
      });
    });

    [
      ['updated', 'apistoreopstateupdate'],
      ['deleted', 'apistoreopstatedelete'],
      ['created', 'apistoreopstatecreate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Operation.State[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Operation.State', StoreEventTypes.Operation.State);
    });
  });

  describe('Parameter', () => {
    it('has Parameter namespace', () => {
      assert.typeOf(StoreEventTypes.Parameter, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Parameter = { read: '' };
      });
    });

    [
      ['get', 'apistoreparamget'],
      ['update', 'apistoreparamupdate'],
      ['addExample', 'apistoreparamupdateaddexample'],
      ['removeExample', 'apistoreparamupdateremoveexample'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Parameter[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Parameter', StoreEventTypes.Parameter);
    });
  });

  describe('Parameter.State', () => {
    it('has Parameter.State namespace', () => {
      assert.typeOf(StoreEventTypes.Parameter.State, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Parameter.State = { read: '' };
      });
    });

    [
      ['updated', 'apistoreparamstateupdate'],
      ['deleted', 'apistoreparamstatedelete'],
      ['created', 'apistoreparamstatecreate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Parameter.State[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Parameter.State', StoreEventTypes.Parameter.State);
    });
  });

  describe('Example', () => {
    it('has Example namespace', () => {
      assert.typeOf(StoreEventTypes.Example, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Example = { read: '' };
      });
    });

    [
      ['get', 'apistoreexampleget'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Example[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Example', StoreEventTypes.Example);
    });
  });

  describe('Example.State', () => {
    it('has Example.State namespace', () => {
      assert.typeOf(StoreEventTypes.Example.State, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Example.State = { read: '' };
      });
    });

    [
      ['updated', 'apistoreexamplestateupdate'],
      ['deleted', 'apistoreexamplestatedelete'],
      ['created', 'apistoreexamplestatecreate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Example.State[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Example.State', StoreEventTypes.Example.State);
    });
  });

  describe('Payload', () => {
    it('has Payload namespace', () => {
      assert.typeOf(StoreEventTypes.Payload, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Payload = { read: '' };
      });
    });

    [
      ['get', 'apistorepayloadget'],
      ['update', 'apistorepayloadupdate'],
      ['addExample', 'apistorepayloadaddexample'],
      ['removeExample', 'apistorepayloadremoveexample'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Payload[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Payload', StoreEventTypes.Payload);
    });
  });

  describe('Payload.State', () => {
    it('has Payload.State namespace', () => {
      assert.typeOf(StoreEventTypes.Payload.State, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Payload.State = { read: '' };
      });
    });

    [
      ['updated', 'apistorepayloadstateupdate'],
      ['deleted', 'apistorepayloadstatedelete'],
      ['created', 'apistorepayloadstatecreate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Payload.State[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Payload.State', StoreEventTypes.Payload.State);
    });
  });

  describe('Request', () => {
    it('has Request namespace', () => {
      assert.typeOf(StoreEventTypes.Request, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Request = { read: '' };
      });
    });

    [
      ['get', 'apistorerequestget'],
      ['update', 'apistorerequestupdate'],
      ['addPayload', 'apistorerequestaddpayload'],
      ['removePayload', 'apistorerequestremovepayload'],
      ['addHeader', 'apistorerequestaddheader'],
      ['removeHeader', 'apistorerequestremoveheader'],
      ['addQueryParameter', 'apistorerequestaddqueryparameter'],
      ['removeQueryParameter', 'apistorerequestremovequeryparameter'],
      ['addCookieParameter', 'apistorerequestaddcookieparameter'],
      ['removeCookieParameter', 'apistorerequestremovecookieparameter'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Request[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Request', StoreEventTypes.Request);
    });
  });

  describe('Request.State', () => {
    it('has Request.State namespace', () => {
      assert.typeOf(StoreEventTypes.Request.State, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Request.State = { read: '' };
      });
    });

    [
      ['updated', 'apistorerequeststateupdate'],
      ['deleted', 'apistorerequeststatedelete'],
      ['created', 'apistorerequeststatecreate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Request.State[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Request.State', StoreEventTypes.Request.State);
    });
  });

  describe('Response', () => {
    it('has Response namespace', () => {
      assert.typeOf(StoreEventTypes.Response, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Response = { read: '' };
      });
    });

    [
      ['get', 'apistoreresponseget'],
      ['update', 'apistoreresponseupdate'],
      ['addHeader', 'apistoreresponseaddheader'],
      ['removeHeader', 'apistoreresponseremoveheader'],
      ['addPayload', 'apistoreresponseaddpayload'],
      ['removePayload', 'apistoreresponseremovepayload'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Response[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Response', StoreEventTypes.Response);
    });
  });

  describe('Response.State', () => {
    it('has Response.State namespace', () => {
      assert.typeOf(StoreEventTypes.Response.State, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Response.State = { read: '' };
      });
    });

    [
      ['updated', 'apistoreresponsestateupdate'],
      ['deleted', 'apistoreresponsestatedelete'],
      ['created', 'apistoreresponsestatecreate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Response.State[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Response.State', StoreEventTypes.Response.State);
    });
  });

  describe('Documentation', () => {
    it('has Documentation namespace', () => {
      assert.typeOf(StoreEventTypes.Documentation, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Documentation = { read: '' };
      });
    });

    [
      ['add', 'apistoredocsadd'],
      ['get', 'apistoredocsget'],
      ['update', 'apistoredocsupdate'],
      ['delete', 'apistoredocsdelete'],
      ['list', 'apistoredocslist'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Documentation[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Documentation', StoreEventTypes.Documentation);
    });
  });

  describe('Documentation.State', () => {
    it('has Documentation.State namespace', () => {
      assert.typeOf(StoreEventTypes.Documentation.State, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Documentation.State = { read: '' };
      });
    });

    [
      ['updated', 'apistoredocsstateupdate'],
      ['deleted', 'apistoredocsstatedelete'],
      ['created', 'apistoredocsstatecreate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Documentation.State[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Documentation.State', StoreEventTypes.Documentation.State);
    });
  });

  describe('Security', () => {
    it('has Security namespace', () => {
      assert.typeOf(StoreEventTypes.Security, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Security = { read: '' };
      });
    });

    [
      ['list', 'apistoresecuritylist'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Security[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Security', StoreEventTypes.Security);
    });
  });

  describe('Server', () => {
    it('has Server namespace', () => {
      assert.typeOf(StoreEventTypes.Server, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Server = { read: '' };
      });
    });

    [
      ['list', 'apistoreserverslist'],
      ['add', 'apistoreserversadd'],
      ['get', 'apistoreserversget'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Server[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Server', StoreEventTypes.Server);
    });
  });

  describe('Server.State', () => {
    it('has Server.State namespace', () => {
      assert.typeOf(StoreEventTypes.Server.State, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Server.State = { read: '' };
      });
    });

    [
      ['updated', 'apistoreserversstateupdate'],
      ['deleted', 'apistoreserversstatedelete'],
      ['created', 'apistoreserversstatecreate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Server.State[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Server.State', StoreEventTypes.Server.State);
    });
  });

  describe('Type', () => {
    it('has Type namespace', () => {
      assert.typeOf(StoreEventTypes.Type, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Type = { read: '' };
      });
    });

    [
      ['add', 'apistoretypeadd'],
      ['get', 'apistoretypeget'],
      ['update', 'apistoretypeupdate'],
      ['delete', 'apistoretypedelete'],
      ['list', 'apistoretypelist'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Type[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Type', StoreEventTypes.Type);
    });
  });

  describe('Type.State', () => {
    it('has Type.State namespace', () => {
      assert.typeOf(StoreEventTypes.Type.State, 'object');
    });

    it('is frozen', () => {
      assert.throws(() => {
        // @ts-ignore
        StoreEventTypes.Type.State = { read: '' };
      });
    });

    [
      ['updated', 'apistoretypestateupdate'],
      ['deleted', 'apistoretypestatedelete'],
      ['created', 'apistoretypestatecreate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Type.State[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Type.State', StoreEventTypes.Type.State);
    });
  });
});
