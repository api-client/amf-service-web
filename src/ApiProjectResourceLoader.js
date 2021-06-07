/* eslint-disable class-methods-use-this */
/** @typedef {import('./types').ApiResource} ApiResource */
/** @typedef {import('amf-client-js').client.remote.Content} Content */

export class ApiProjectResourceLoader {
  /**
   * @param {ApiResource[]} contents
   */
  constructor(contents) {
    /**
     * @type ApiResource[]
     */
    this.contents = contents;
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
      return {
        stream: resource.contents,
        url: path,
      };
    }
    return undefined;
  }

  static async fail() {
    throw new Error('Failed to load resource');
  }
}
