/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/** @typedef {import('../types').ContentFile} ContentFile */
/** @typedef {import('../types').ApiSearchTypeResult} ApiSearchTypeResult */
/** @typedef {import('../types').ParserVendors} ParserVendors */

/**
 * Searches for API main file in given location
 */
 export class ApiSearch {
  /**
    * Finds main API name.
    *
    * If one of the files is one of the popular names for the API spec files
    * then it always returns this file.
    *
    * If it finds single candidate it returns it as a main file.
    *
    * If it finds more than a single file it means that the user has to decide
    * which one is the main file.
    *
    * If it returns undefined than the process failed and API main file cannot
    * be determined.
    *
    * @param {ContentFile[]} items
    * @returns {ContentFile|ContentFile[]|undefined}
    */
   findApiFile(items) {
     const popularNames = ['api.raml', 'api.yaml', 'api.json'];
     const exts = ['.raml', '.yaml', '.json'];
     const ignore = ['__macosx', 'exchange.json', '.ds_store'];
     const files = [];
     for (let i = 0; i < items.length; i++) {
       const item = items[i];
       const lower = item.name.toLowerCase();
       const fName = lower.substr(lower.lastIndexOf('/') + 1);
       if (!fName) {
         // this is a folder.
         continue;
       }
       if (ignore.includes(fName)) {
         continue;
       }
       if (popularNames.includes(fName)) {
         return item;
       }
       const ext = fName.substr(fName.lastIndexOf('.'));
       if (exts.includes(ext)) {
         files.push(item);
       }
     }
     if (files.length === 1) {
       return files[0];
     }
     if (files.length) {
       return this.decideMainFile(files);
     }
     return undefined;
   }
 
   /**
    * Decides which file to use as API main file.
    * @param {ContentFile[]} files A file or list of files.
    * @returns {ContentFile|ContentFile[]}
    */
   decideMainFile(files) {
     const list = this.findWebApiFile(Array.from(files));
     if (!list) {
       return files;
     }
     return list;
   }
 
   /**
    * Reads all files and looks for 'RAML 0.8' or 'RAML 1.0' header which is a WebApi.
    * @param {ContentFile[]} files List of candidates
    * @param {ContentFile[]=} results List od results
    * @returns {ContentFile|ContentFile[]|undefined}
    */
   findWebApiFile(files, results=[]) {
     const f = files.shift();
     if (!f) {
       if (!results.length) {
         results = undefined;
       }
       if (results && results.length === 1) {
         return results[0];
       }
       return results;
     }
     try {
       const type = this.readApiType(f);
       if (type && type.type) {
         results[results.length] = f;
       }
     } catch (e) {
       // eslint-disable-next-line no-console
       console.warn('Unable to find file type', e);
     }
     return this.findWebApiFile(files, results);
   }
 
   /**
    * Reads API type from the API main file.
    * @param {ContentFile} file File location
    * @return {ApiSearchTypeResult}
    */
   readApiType(file) {
     const { content } = file;
     const data = content.trim();
     if (data[0] === '{') {
       // OAS 1/2
       const match = data.match(/"swagger"(?:\s*)?:(?:\s*)"(.*)"/im);
       if (!match) {
         throw new Error('Expected OAS but could not find version header.');
       }
       const v = match[1].trim();
       const oasVer = v[0] === '2' ? '2.0' : '3.0.0';
       return {
         type: /** @type ParserVendors */ (`OAS ${oasVer}`),
         contentType: 'application/json',
       };
     }
     const oasMatch = data.match(/(?:openapi|swagger)[^\s*]?:(?:\s*)("|')?(\d\.\d)("|')?/im);
     if (oasMatch) {
       const v = oasMatch[2].trim();
       const oasVer = v[0] === '2' ? '2.0' : '3.0.0';
       return {
         type: /** @type ParserVendors */ (`OAS ${oasVer}`),
         contentType: 'application/yaml',
       };
     }
     const asyncMatch = data.match(/syncApi[^\s*]?:(?:\s*)("|')?(\d\.\d)("|')?/im);
     if (asyncMatch) {
       const v = asyncMatch[2].trim();
       return {
         type: /** @type ParserVendors */ (`Async ${v}`),
         contentType: 'application/yaml',
       };
     }
     const header = data.split('\n')[0].substr(2).trim();
     if (!header || header.indexOf('RAML ') !== 0) {
       throw new Error('The API file header is unknown');
     }
     if (header === 'RAML 1.0' || header === 'RAML 0.8') {
       return {
         type: /** @type ParserVendors */ (header),
         contentType: 'application/yaml',
       };
     }
     switch (header) {
       case 'RAML 1.0 Overlay':
       case 'RAML 1.0 Extension':
       case 'RAML 1.0 DataType':
       case 'RAML 1.0 SecurityScheme':
       case 'RAML 1.0 Trait':
       case 'RAML 1.0 Library':
       case 'RAML 1.0 NamedExample':
       case 'RAML 1.0 DocumentationItem':
       case 'RAML 1.0 ResourceType':
       case 'RAML 1.0 AnnotationTypeDeclaration':
         return {
           type: 'RAML 1.0',
           contentType: 'application/yaml',
         };
       default: throw new Error('Unsupported API file');
     }
   }
 }
