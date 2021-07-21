/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs-extra';
import path from 'path';
import amf from 'amf-client-js';

/** @typedef {import('./types').ApiConfiguration} ApiConfiguration */
/** @typedef {import('./types').FilePrepareResult} FilePrepareResult */
/** @typedef {import('./types').ApiGenerationOptions} ApiGenerationOptions */
/** @typedef {import('./types').ApiType} ApiType */

/**
 * Normalizes input options to a common structure.
 * @param {ApiConfiguration|string|string[]} input User input
 * @return {ApiConfiguration} A resulting configuration options with
 */
function normalizeOptions(input) {
  if (Array.isArray(input)) {
    const [type, mime, resolution, flattened] = input;
    // @ts-ignore
    return { type, mime, resolution, flattened };
  }
  if (typeof input === 'object') {
    return input;
  }
  return {
    type: /** @type ApiType */ (input),
  };
}

/**
 * Parses file and sends it to process.
 *
 * @param {string} file File name in `demo` folder
 * @param {ApiConfiguration|string|string[]} cnf
 * @param {ApiGenerationOptions} opts Processing options
 * @return {Promise<void>}
 */
async function parseFile(file, cnf, opts) {
  let { src='demo/', dest='demo/' } = opts;
  if (!src.endsWith('/')) {
    src += '/';
  }
  if (!dest.endsWith('/')) {
    dest += '/';
  }
  const { type, mime='application/yaml' } = normalizeOptions(cnf);

  /** @type amf.AMFConfiguration */
  let configuration;
  switch (type) {
    case 'OAS 2.0': configuration = amf.OASConfiguration.OAS20(); break;
    case 'OAS 3.0': configuration = amf.OASConfiguration.OAS30(); break;
    case 'RAML 1.0': configuration = amf.RAMLConfiguration.RAML10(); break;
    case 'RAML 0.8': configuration = amf.RAMLConfiguration.RAML08(); break;
    case 'ASYNC 2.0': configuration = amf.AsyncAPIConfiguration.Async20(); break;
    default: throw new Error(`Unsupported API type: ${type}`);
  }
  const ro = new amf.RenderOptions().withCompactUris().withPrettyPrint().withSourceMaps();
  const client = configuration.withRenderOptions(ro).baseUnitClient();
  const result = await client.parseDocument(`file://${src}${file}`, mime);
  
  if (!result.conforms) {
    /* eslint-disable-next-line no-console */
    result.results.forEach(r => console.error(r.toString()));
  }
  const transformed = client.transform(result.baseUnit, amf.ProvidedMediaType.AMF);
  // const transformResult = client.transformCompatibility(result.baseUnit, amf.ProvidedMediaType.AMF);
  const rendered = client.render(transformed.baseUnit, amf.Vendor.AMF.mediaType);
  
  let destFile = `${file.substr(0, file.lastIndexOf('.')) }.json`;
  if (destFile.indexOf('/') !== -1) {
    destFile = destFile.substr(destFile.lastIndexOf('/'));
  }
  const fullFile = path.join(dest, destFile);
  await fs.ensureFile(fullFile);
  await fs.writeFile(fullFile, rendered, 'utf8');
}

/**
 * Reads `file` as JSON and creates a Map with definitions from the file.
 * The keys are paths to the API file relative to `opts.src` and values is
 * API type.
 * @param {string} file Path to a file definition.
 * @return {FilePrepareResult} The key is the api file location in the `opts.src`
 * directory. The value is the build configuration.
 */
async function prepareFile(file) {
  const readFile = path.resolve(process.cwd(), file);
  const data = await fs.readJson(readFile);
  const files = new Map();
  const opts = {};
  Object.keys(data).forEach((key) => {
    switch (key) {
      case 'src':
      case 'dest':
        opts[key] = data[key];
        break;
      default:
        files.set(key, data[key]);
        break;
    }
  });
  return {
    files,
    opts,
  };
}

export default async function main(init, opts={}) {
  if (typeof init === 'string') {
    const { files: cnfFiles, opts: cnfOpts } = await prepareFile(init);
    init = cnfFiles;
    opts = { ...cnfOpts, ...opts };
  }
  for (const [file, type] of init) {
    await parseFile(file, type, opts);
  }
};
