/* eslint-disable class-methods-use-this */
/** @typedef {import('./types').ApiResource} ApiResource */
/** @typedef {import('amf-client-js').Content} Content */
/** @typedef {import('amf-client-js')} AMF */

export class ApiProjectResourceLoader {
  /**
   * @param {ApiResource[]} contents
   * @param {AMF} amf
   */
  constructor(contents, amf) {
    /**
     * @type ApiResource[]
     */
    this.contents = contents;
    this.amf = amf;
  }

  /**
   * @param {string} path 
   * @returns {boolean}
   */
  accepts(path) {
    return path.startsWith('file://') || path.startsWith('http://');
  }

  /**
   * @param {string} path 
   * @returns {Promise<Content>}
   */
  async fetch(path) {
    const fPath = path.replace('http://a.ml/amf/default_document/', '').replace('file://', '');
    const resource = this.contents.find((item) => item.path === fPath);
    if (resource) {
      const content = new this.amf.Content(resource.contents, path);
      return content;
    }
    return undefined;
  }

  static async fail() {
    throw new Error('Failed to load resource');
  }
}
