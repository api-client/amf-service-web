/* eslint-disable no-console */
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
 * @param {ApiConfiguration|string} input User input
 * @return {ApiConfiguration} A resulting configuration options with
 */
function normalizeOptions(input) {
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
 * @param {ApiConfiguration|string} cnf
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
  const { type } = normalizeOptions(cnf);

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
  const result = await client.parseDocument(`file://${src}${file}`);
  
  if (!result.conforms) {
    /* eslint-disable-next-line no-console */
    result.results.forEach(r => console.error(r, r.toString()));
  }
  const transformed = client.transform(result.baseUnit);
  // const transformResult = client.transformCompatibility(result.baseUnit, amf.ProvidedMediaType.AMF);
  const rendered = client.render(transformed.baseUnit, 'application/ld+json');
  
  let destFile = `${file.substr(0, file.lastIndexOf('.')) }.json`;
  if (destFile.indexOf('/') !== -1) {
    destFile = destFile.substr(destFile.lastIndexOf('/'));
  }
  const fullFile = path.join(dest, destFile);
  await fs.ensureFile(fullFile);
  await fs.writeFile(fullFile, rendered, 'utf8');
}

/**
 * Parses the API models to prepare it for tests and demo pages
 * @param {Map<string, ApiConfiguration>} init Either path to the api list file or the list of files to parse.
 * @param {ApiGenerationOptions=} opts Optional parsing options.
 */
export default async function main(init, opts={}) {
  for (const [file, type] of init) {
    await parseFile(file, type, opts);
  }
};

/**
 * Runs the default function and exists the process when failed.
 * @param {Map<string, ApiConfiguration>} init Either path to the api list file or the list of files to parse.
 * @param {ApiGenerationOptions=} opts Optional parsing options.
 */
export async function generate(init, opts) {
  try {
    console.log(`Generating graph models for ${init.size} api(s).`);
    await main(init, opts);
    console.log('Models created');
  } catch (cause) {
    console.error(cause);
    process.exit(1);
  }
}
