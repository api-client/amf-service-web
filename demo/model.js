import { generate } from '../tasks/prepare-models.js';

/** @typedef {import('../tasks/types').ApiConfiguration} ApiConfiguration */

/** @type {Map<string, ApiConfiguration>} */
const config = new Map();
config.set('async-api/async-api.yaml', { type: "ASYNC 2.0" });
config.set('demo-api/demo-api.raml', { type: "RAML 1.0" });
config.set('google-drive-api/google-drive-api.raml', { type: "RAML 1.0" });
config.set('oas-3-api/oas-3-api.yaml', { type: "OAS 3.0" });
config.set('streetlights/streetlights.yaml', { type: "ASYNC 2.0" });

generate(config);
