import type { ApiDefinitions } from "@api-client/core/build/esm/browser.js";

export interface CommonRootInfo {
  index: number;
  item: ApiDefinitions.IApiEndpointsTreeItem;
  common: string;
}

/**
 * A class that transforms the list of endpoints and methods into
 * a tree structure with indentation
 */
export class EndpointsTree {
  result: ApiDefinitions.IApiEndpointsTreeItem[];
  
  indents: Record<string, number>;

  constructor() {
    this.result = [];
    this.indents = {};
  }

  /**
   * @param list Sorted list of endpoints.
   */
  create(list: ApiDefinitions.IApiEndPointListItem[]): ApiDefinitions.IApiEndpointsTreeItem[] {
    if (!Array.isArray(list) || !list.length) {
      return [];
    }
    const { result, indents } = this;
    let prev: ApiDefinitions.IApiEndpointsTreeItem | undefined;
    for (let i = 0, len = list.length; i < len; i++) {
      const item: ApiDefinitions.IApiEndpointsTreeItem = { ...list[i], indent: 0, label: '', operations: [] };
      const { path } = item;
      const parts = path.split('/');
      const hasParts = parts.length > 1 && !(parts.length === 2 && !parts[0]);
      if (i === 0) {
        if (hasParts) {
          const parent: ApiDefinitions.IApiEndpointsTreeItem = {
            indent: 0,
            path: parts.slice(0, parts.length - 1).join('/'),
            label: '',
            operations: [],
            hasChildren: true,
          };
          parent.label = parent.path;
          prev = parent;
          indents[parent.path] = item.indent;
          result.push(parent);
        } else {
          prev = item;
          indents[item.path] = item.indent;
          result.push(this.prepareLabel(item));
          continue;
        }
      }
      // this is similar to the next block but is faster when the previous item is parent.
      if (prev && path.startsWith(prev.path)) {
        item.indent = prev.indent + 1;
        prev.hasChildren = true;
        indents[item.path] = item.indent;
        result.push(this.prepareLabel(item, prev.path));
        prev = item;
        continue;
      }
      const upPath = this.findParentEndpoint(parts);
      if (upPath) {
        item.indent = indents[upPath] + 1;
        const parent = result.find((p) => p.path === upPath) as ApiDefinitions.IApiEndpointsTreeItem;
        parent.hasChildren = true;
        indents[item.path] = item.indent;
        result.push(this.prepareLabel(item, upPath));
      } else {
        if (hasParts) {
          const info = this.findCommonRootInfo(parts);
          if (info) {
            const parent = {
              indent: info.item.indent,
              path: info.common,
              label: info.common,
              operations: [],
              hasChildren: true,
            };
            this.postInsertParent(parent);
            indents[parent.path] = parent.indent;
            result.splice(info.index, 0, parent);
            item.indent = parent.indent + 1;
            indents[item.path] = item.indent;
            result.push(this.prepareLabel(item, parent.path));
            continue;
          }
        }
        item.indent = 0;
        indents[item.path] = item.indent;
        result.push(this.prepareLabel(item));
      }
      prev = item;
    }
    return result;
  }

  /**
   * @param parts Path parts of the currently evaluated endpoint
   */
  findParentEndpoint(parts: string[]): string | undefined {
    const { indents } = this;
    const list = Array.from(parts);
    const compare = Object.keys(indents).reverse();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const path = list.join('/');
      if (!path) {
        break;
      }
      const upPath = compare.find((candidate) => path.startsWith(candidate));
      if (upPath) {
        return upPath;
      }
      list.pop();
      if (!list.length) {
        break;
      }
    }
    return undefined;
  }

  /**
   * @param parts Path parts of the currently evaluated endpoint
   */
  findCommonRootInfo(parts: string[]): CommonRootInfo|undefined {
    const { result } = this;
    const list = Array.from(parts);
    // eslint-disable-next-line no-constant-condition
    while (true) {
      list.pop();
      if (!list.length) {
        break;
      }
      const path = list.join('/');
      if (!path) {
        break;
      }
      const index = result.findIndex((candidate) => candidate.path.startsWith(path));
      if (index !== -1) {
        return {
          index,
          item: result[index],
          common: path,
        };
      }
    }
    return undefined;
  }

  prepareLabel(item: ApiDefinitions.IApiEndpointsTreeItem, prevPath?: string): ApiDefinitions.IApiEndpointsTreeItem {
    const { name, path, indent } = item;
    item.label = path;
    if (name) {
      item.label = name;
    } else if (indent > 0 && prevPath) {
      item.label = item.label.replace(prevPath, '');
      item.hasShortPath = true;
      if (!item.label.startsWith('/')) {
        item.label = `/${item.label}`;
      }
    }
    return item;
  }

  /**
   * Updates paths and indentation of children after inserting a new (abstract) parent.
   */
  postInsertParent(parent: ApiDefinitions.IApiEndpointsTreeItem): void {
    const { result } = this;
    result.forEach((item) => {
      const { path } = item;
      if (path.startsWith(parent.path)) {
        item.indent += 1;
        item.label = item.label.replace(parent.path, '');
      }
    });
  }
}
