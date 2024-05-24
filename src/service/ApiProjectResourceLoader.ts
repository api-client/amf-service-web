import type * as AMF from 'amf-client-js';
import type { ApiResource } from '../types.js';

export class ApiProjectResourceLoader {
  contents: ApiResource[]; 
  amf: typeof AMF;

  constructor(contents: ApiResource[], amf: typeof AMF) {
    this.contents = contents;
    this.amf = amf;
  }

  accepts(path: string): boolean {
    return path.startsWith('file://') || path.startsWith('http://');
  }

  async fetch(path: string): Promise<AMF.Content> {
    const fPath = path.replace('http://a.ml/amf/default_document/', '').replace('file://', '');
    const resource = this.contents.find((item) => item.path === fPath);
    if (resource) {
      const content = new this.amf.Content(resource.contents, path);
      return content;
    }
    throw new Error('Failed to load resource. Resource not found.');
  }

  static async fail(): Promise<boolean> {
    throw new Error('Failed to load resource');
  }
}
