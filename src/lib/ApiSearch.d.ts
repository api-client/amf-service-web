import { ApiSearchTypeResult, ContentFile } from "../types";

/**
 * Searches for API main file in given location
 */
 export declare class ApiSearch {
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
    */
   findApiFile(items: ContentFile[]): ContentFile|ContentFile[]|undefined;
 
   /**
    * Decides which file to use as API main file.
    * @param files A file or list of files.
    */
   decideMainFile(files: ContentFile[]): ContentFile|ContentFile[];
 
   /**
    * Reads all files and looks for 'RAML 0.8' or 'RAML 1.0' header which is a WebApi.
    * @param files List of candidates
    * @param results List od results
    */
   findWebApiFile(files: ContentFile[], results?: ContentFile[]): ContentFile|ContentFile[]|undefined;
 
   /**
    * Reads API type from the API main file.
    * @param file File location
    */
   readApiType(file: ContentFile): ApiSearchTypeResult;
 }
