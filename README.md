# AMF service for web apps

> This is a work in progress.

[![Published on NPM](https://img.shields.io/npm/v/@api-client/amf-store.svg)](https://www.npmjs.com/package/@api-client/amf-store)

[![Tests and publishing](https://github.com/api-client/amf-store/actions/workflows/deployment.yml/badge.svg)](https://github.com/api-client/amf-store/actions/workflows/deployment.yml)

The AMF service for web provides an access to the graph model generated from an API specification and parsed by the AMF parser.
This service allows to read and manipulate API meta data. Can be used to render API documentation or to create / edit existing APIs.

The entire work is performed in a web worker. This is essential especially when parsing APIs to eliminate a possibility of freezing the main thread.

## Status

- [x] Importing an API from graph model (previously parsed by AMF parser)
- [x] Creating a new web API
- [ ] Creating a new Async API
- [ ] Reading API model (about 70% done)
- [ ] Manipulating API model (CUD) (about 5% done)
- [ ] Generating API spec file
- [ ] Importing API from source
- [ ] Dom event based access to the meta store

## Usage

Be aware: this is a work in progress. Everything at this point is a subject to change without prior notification or breaking changes announcements.

### Installation

```sh
npm install --save @api-client/amf-store
```

### Using the store in a web browser

To use the store directly in a web browser use the `AmfStoreService` class. The constructor accepts two argument: the events target (`EventTarget` instance) and optional configuration for the web worker creation and the AMF bundle location.

By default the web worker location is expected to be in the `workers/AmfWorker.js` relative to the library location. You can set any the location by setting the `workerLocation` on the init object.

```javascript
import { AmfStoreService } from '@api-client/amf-store';

const store = new AmfStoreService(window, {
  workerLocation: './node_modules/@api-client/amf-store/workers/AmfWorker.js',
});
```

Mind that the worker imports scripts from the main library so it also requires bundling when used.

Alternatively, you can set the `createWebWorker` property on the init object to manually create the worker instance.

```javascript
import { AmfStoreService } from '@api-client/amf-store';

const store = new AmfStoreService(window, {
  createWebWorker: () => {
    return new Worker('./node_modules/@api-client/amf-store/workers/AmfWorker.js', {
      type: 'module',
    });
  },
});
```

Finally, the worker imports the AMF bundle located in the root of this library. By default it expects the library to be located at `/amf-bundle.js`, which is the root of your web server. You can set a custom location by setting the `amfLocation` property on the init object.

```javascript
import { AmfStoreService } from '@api-client/amf-store';

const store = new AmfStoreService(window, {
  amfLocation: '/static/amf-bundle.js',
});
```

## Development

```sh
git clone https://github.com/@api-client/amf-store
cd amf-store
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```

## License

<!-- API Components © 2021 by Pawel Psztyc is licensed under CC BY 4.0. -->

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><span property="dct:title">API Components</span> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/jarrodek">Pawel Psztyc</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>
