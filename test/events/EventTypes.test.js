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
      ['list', 'apistoreendpointlist'],
      ['listWithOperations', 'apistoreendpointlistwithops'],
      ['listOperations', 'apistoreendpointoperations'],
      ['add', 'apistoreendpointadd'],
      ['delete', 'apistoreendpointdelete'],
      ['get', 'apistoreendpointget'],
      ['update', 'apistoreendpointupdate'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Endpoint[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Endpoint', StoreEventTypes.Endpoint);
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
      ['add', 'apistoreopadd'],
      ['get', 'apistoreopget'],
      ['delete', 'apistoreopdelete'],
      ['update', 'apistoreopupdate'],
      ['addRequest', 'apistoreopaddrequest'],
      ['addResponse', 'apistoreopaddresponse'],
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Operation[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Operation', StoreEventTypes.Operation);
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
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Parameter[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Parameter', StoreEventTypes.Parameter);
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
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Payload[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Payload', StoreEventTypes.Payload);
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
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Request[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Request', StoreEventTypes.Request);
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
    ].forEach(([prop, value]) => {
      it(`has ${prop} property`, () => {
        assert.equal(StoreEventTypes.Response[prop], value);
      });
    });

    it('has unique events for the namespace', () => {
      ensureUnique('StoreEventTypes.Response', StoreEventTypes.Response);
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
});
