import { assert } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { WebWorkerService, StoreEvents } from '../../src/worker.index.js';
import { ApiDefinitions } from '@api-client/core';
import { TestPersistance } from '../helpers/TestPersistance.js';
import createTestService, { getAmfWorkerLocation } from '../helpers/web-service.js';

describe('WebWorkerService', () => {
  describe('Reading data', () => {
    let demoStore: WebWorkerService;
    let oasStore: WebWorkerService;
    const demoEt = document.createElement('span');

    before(async () => {
      demoStore = new WebWorkerService(new TestPersistance('id'), {
        eventsTarget: demoEt,
        workerLocation: getAmfWorkerLocation(),
      });
      oasStore = createTestService();
      await demoStore.init();
      await oasStore.init();
      
      const demoApi = await AmfLoader.loadApi();
      await demoStore.loadGraph(demoApi, 'RAML 1.0');

      const oasApi = await AmfLoader.loadApi('oas-3-api.json');
      await oasStore.loadGraph(oasApi, 'OAS 3.0');
    });

    after(() => {
      demoStore.worker.terminate();
      oasStore.worker.terminate();
    });

    describe('listSecurity()', () => {
      it('reads list of security', async () => {
        const result  = await demoStore.listSecurity();
        assert.typeOf(result, 'array', 'has the security');
        assert.lengthOf(result, 3, 'has all security definitions');
      });
  
      it('has the security definition', async () => {
        const result  = await demoStore.listSecurity();
        const sec = result.find(i => i.name === 'oauth_2_0');
        assert.ok(sec, 'has the name');
        assert.typeOf(sec.id, 'string', 'has the id');
        assert.equal(sec.type, 'OAuth 2.0', 'has the type');
      });
  
      it('list security with the event', async () => {
        const result = await StoreEvents.Security.list(document.body);
        assert.typeOf(result, 'array');
      });
    });

    async function getSecuritySchemeId(name: string): Promise<string> {
      const list  = await demoStore.listSecurity();
      const scheme = list.find((item) => item.name === name);
      if (!scheme) {
        throw new Error(`Unknown security scheme ${name}`);
      }
      return scheme.id;
    }

    describe('getSecurityScheme()', () => {
      it('reads the security definition', async () => {
        const id = await getSecuritySchemeId('oauth_2_0');
        const result = await demoStore.getSecurityScheme(id);
        assert.typeOf(result.headers, 'array', 'has the headers property');
        assert.typeOf(result.queryParameters, 'array', 'has the queryParameters property');
        assert.typeOf(result.responses, 'array', 'has the responses property');
        assert.typeOf(result.settings, 'object', 'has the settings property');
        // assert.equal(result.name, 'oauth_2_0', 'has the name property');
        assert.equal(result.type, 'OAuth 2.0', 'has the type property');
        assert.equal(result.description, 'This API supports OAuth 2.0 for authenticating all API requests.', 'has the description property');
      });

      it('has the oauth 2 settings', async () => {
        const id = await getSecuritySchemeId('oauth_2_0');
        const result = await demoStore.getSecurityScheme(id);
        const schema = (result.settings) as ApiDefinitions.IApiSecurityOAuth2Settings;
        assert.typeOf(schema.flows, 'array', 'has the flows property');
        assert.typeOf(schema.authorizationGrants, 'array', 'has the authorizationGrants property');
      });

      it('reads the security via the event', async () => {
        const id = await getSecuritySchemeId('oauth_2_0');
        const result = await StoreEvents.Security.get(id, demoEt);
        // assert.equal(result.name, 'oauth_2_0', 'has the name property');
        assert.equal(result!.type, 'OAuth 2.0', 'has the type property');
      });
    });

    describe('getSecurityScheme()', () => {
      it('reads the security definition', async () => {
        const id = await getSecuritySchemeId('oauth_2_0');
        const result = await demoStore.getSecurityScheme(id);
        assert.typeOf(result.headers, 'array', 'has the headers property');
        assert.typeOf(result.queryParameters, 'array', 'has the queryParameters property');
        assert.typeOf(result.responses, 'array', 'has the responses property');
        assert.typeOf(result.settings, 'object', 'has the settings property');
        // assert.equal(result.name, 'oauth_2_0', 'has the name property');
        assert.equal(result.type, 'OAuth 2.0', 'has the type property');
        assert.equal(result.description, 'This API supports OAuth 2.0 for authenticating all API requests.', 'has the description property');
      });

      it('has the oauth 2 settings', async () => {
        const id = await getSecuritySchemeId('oauth_2_0');
        const result = await demoStore.getSecurityScheme(id);
        const schema = (result.settings) as ApiDefinitions.IApiSecurityOAuth2Settings;
        assert.typeOf(schema.flows, 'array', 'has the flows property');
        assert.typeOf(schema.authorizationGrants, 'array', 'has the authorizationGrants property');
      });

      it('reads the security via the event', async () => {
        const id = await getSecuritySchemeId('oauth_2_0');
        const result = await StoreEvents.Security.get(id, demoEt);
        // assert.equal(result.name, 'oauth_2_0', 'has the name property');
        assert.equal(result!.type, 'OAuth 2.0', 'has the type property');
      });
    });

    describe('getSecurityRequirement()', () => {
      it('reads the security definition on an operation', async () => {
        // const ep = await demoStore.getEndpoint('/messages');
        // const [id] = ep.security;
        const op = await demoStore.getOperation('post', '/messages');
        const [requirement] = op.security;
        const result = await demoStore.getSecurityRequirement(requirement.id);
        assert.typeOf(result.schemes, 'array', 'has the schemes property');
        assert.lengthOf(result.schemes, 1, 'has a single scheme');
        const [scheme] = result.schemes;
        // if this fails just check what is the name of the generated security for this operation.
        assert.equal(scheme.name, 'basic', 'has the scheme details');
      });

      it('reads the security requirement via the event', async () => {
        // const ep = await demoStore.getEndpoint('/messages');
        // const [id] = ep.security;
        const op = await demoStore.getOperation('post', '/messages');
        const [requirement] = op.security;
        const result = await StoreEvents.Security.getRequirement(requirement.id, demoEt);
        assert.typeOf(result!.schemes, 'array', 'has the schemes property');
        assert.lengthOf(result!.schemes, 1, 'has a single scheme');
        const [scheme] = result!.schemes;
        // if this fails just check what is the name of the generated security for this operation.
        assert.equal(scheme.name, 'basic', 'has the scheme details');
      });
    });

    describe('getSecuritySettings()', () => {
      it.skip('reads the security definition on an operation', async () => {
        const op = await oasStore.getOperation('get', '/securityCombo');
        const requirement = await oasStore.getSecurityRequirement(op.security[0].id);
        const settingsId = requirement.schemes[0].settings!.id;
        const result = await oasStore.getSecuritySettings(settingsId);
        console.log(result);
      });
    });

    describe('reading security model', () => {
      // security read from the declares rather than an operation.
      it('reads OAuth2 security', async () => {
        const list  = await demoStore.listSecurity();
        const oa2 = list.find(i => i.type === 'OAuth 2.0')!;
        const result = await demoStore.getSecurityScheme(oa2.id);
        const { headers, queryParameters, responses, name, type, description, settings } = result;
        assert.lengthOf(headers, 1, 'has headers');
        assert.lengthOf(queryParameters, 1, 'has queryParameters');
        assert.lengthOf(responses, 2, 'has responses');
        assert.equal(name, 'oauth_2_0', 'has name');
        assert.equal(type, 'OAuth 2.0', 'has type');
        assert.equal(description, 'This API supports OAuth 2.0 for authenticating all API requests.', 'has description');
        assert.typeOf(settings, 'object', 'has settings');
      });
    });
  });
});
