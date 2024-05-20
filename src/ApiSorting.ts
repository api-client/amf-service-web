import { ApiDefinitions } from '@api-client/core';

export class ApiSorting {
  /**
   * Sorts endpoints by path.
   */
  static sortEndpointsByPath(list: ApiDefinitions.IApiEndPointListItem[]): ApiDefinitions.IApiEndPointListItem[] {
    list.sort((a,b) => {
      if (a.path < b.path){
        return -1;
      }
      if (a.path > b.path){
        return 1;
      }
      return 0;
    });
    return list;
  }
}
