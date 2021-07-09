import { assert } from '@open-wc/testing';
import { AmfLoader } from '../helpers/AmfLoader.js';
import { AmfStoreService, StoreEvents } from '../../worker.index.js';

/** @typedef {import('../../').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('../../').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('../../').ApiSecurityOAuth2Settings} ApiSecurityOAuth2Settings */

describe('AmfStoreService', () => {
  describe('Reading data', () => {
    let demoStore = /** @type AmfStoreService */ (null);
    let oasStore = /** @type AmfStoreService */ (null);
    const demoEt = document.createElement('span');

    before(async () => {
      demoStore = new AmfStoreService(demoEt);
      oasStore = new AmfStoreService();
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
        const sec = result[2];
        assert.typeOf(sec.id, 'string', 'has the id');
        assert.equal(sec.type, 'OAuth 2.0', 'has the type');
        assert.equal(sec.name, 'oauth_2_0', 'has the name');
      });
  
      it('list security with the event', async () => {
        const result = await StoreEvents.Security.list(document.body);
        assert.typeOf(result, 'array');
      });
    });

    /**
     * @param {string} name 
     * @returns {Promise<string>}
     */
    async function getSecuritySchemeId(name) {
      const list  = await demoStore.listSecurity();
      const scheme = list.find((item) => item.name === name);
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
        const schema = /** @type ApiSecurityOAuth2Settings */ (result.settings);
        assert.typeOf(schema.flows, 'array', 'has the flows property');
        assert.typeOf(schema.authorizationGrants, 'array', 'has the authorizationGrants property');
      });

      it('reads the security via the event', async () => {
        const id = await getSecuritySchemeId('oauth_2_0');
        const result = await StoreEvents.Security.get(demoEt, id);
        // assert.equal(result.name, 'oauth_2_0', 'has the name property');
        assert.equal(result.type, 'OAuth 2.0', 'has the type property');
      });
    });

    describe('getSecuritySchemeRecursive()', () => {
      it('reads the security definition', async () => {
        const id = await getSecuritySchemeId('oauth_2_0');
        const result = await demoStore.getSecuritySchemeRecursive(id);
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
        const result = await demoStore.getSecuritySchemeRecursive(id);
        const schema = /** @type ApiSecurityOAuth2Settings */ (result.settings);
        assert.typeOf(schema.flows, 'array', 'has the flows property');
        assert.typeOf(schema.authorizationGrants, 'array', 'has the authorizationGrants property');
      });

      it('reads the security via the event', async () => {
        const id = await getSecuritySchemeId('oauth_2_0');
        const result = await StoreEvents.Security.getRecursive(demoEt, id);
        
        // assert.equal(result.name, 'oauth_2_0', 'has the name property');
        assert.equal(result.type, 'OAuth 2.0', 'has the type property');
      });
    });

    describe('getSecurityRequirement()', () => {
      it('reads the security definition on an operation', async () => {
        const ep = await demoStore.getEndpoint('/messages');
        const [id] = ep.security;
        // console.log(ep.security);
        // const op = await demoStore.getOperation('post', '/messages');
        // const [id] = op.security;
        const result = await demoStore.getSecurityRequirement(id);
        assert.typeOf(result.schemes, 'array', 'has the schemes property');
        assert.lengthOf(result.schemes, 1, 'has a single scheme');
        const [scheme] = result.schemes;
        // if this fails just check what is the name of the generated security for this operation.
        assert.equal(scheme.name, 'basic', 'has the scheme details');
      });

      it('reads the security requirement via the event', async () => {
        const ep = await demoStore.getEndpoint('/messages');
        const [id] = ep.security;
        // const op = await demoStore.getOperation('post', '/messages');
        // const [id] = op.security;
        const result = await StoreEvents.Security.getRequirement(demoEt, id);
        assert.typeOf(result.schemes, 'array', 'has the schemes property');
        assert.lengthOf(result.schemes, 1, 'has a single scheme');
        const [scheme] = result.schemes;
        // if this fails just check what is the name of the generated security for this operation.
        assert.equal(scheme.name, 'basic', 'has the scheme details');
      });
    });

    describe('getSecurityRequirementRecursive()', () => {
      it('reads the security definition on an operation', async () => {
        const ep = await demoStore.getEndpoint('/messages');
        const [id] = ep.security;
        // const op = await demoStore.getOperation('post', '/messages');
        // const [id] = op.security;
        const result = await demoStore.getSecurityRequirementRecursive(id);
        assert.typeOf(result.schemes, 'array', 'has the schemes property');
        assert.lengthOf(result.schemes, 1, 'has a single scheme');
        const [scheme] = result.schemes;
        // if this fails just check what is the name of the generated security for this operation.
        assert.equal(scheme.name, 'basic', 'has the scheme details');
      });

      it('reads the security requirement via the event', async () => {
        const ep = await demoStore.getEndpoint('/messages');
        const [id] = ep.security;
        // const op = await demoStore.getOperation('post', '/messages');
        // const [id] = op.security;
        const result = await StoreEvents.Security.getRequirementRecursive(demoEt, id);
        assert.typeOf(result.schemes, 'array', 'has the schemes property');
        assert.lengthOf(result.schemes, 1, 'has a single scheme');
        const [scheme] = result.schemes;
        // if this fails just check what is the name of the generated security for this operation.
        assert.equal(scheme.name, 'basic', 'has the scheme details');
      });
    });

    // describe('getSecuritySettings()', () => {
    //   it('reads the security definition on an operation', async () => {
    //     const op = await oasStore.getOperation('get', '/securityCombo');
    //     const requirement = await demoStore.getSecurityRequirement(op.security[0]);
    //     console.log('requirement', requirement);
    //     const settingsId = requirement.schemes[0].settings.id;

    //     const result = await demoStore.getSecuritySettings(settingsId);
    //     console.log(result);
    //   });
    // });
  });
});
