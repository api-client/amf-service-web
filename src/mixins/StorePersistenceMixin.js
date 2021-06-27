/* eslint-disable class-methods-use-this */
import { dedupeMixin } from '@open-wc/dedupe-mixin';

export const storeTimeoutValue = Symbol('storeTimeoutValue');

const mxFunction = base => {
  class StorePersistenceMixin extends base {
    /**
     * @param {...any} args Base class arguments
     */
    constructor(...args) {
      super(...args);
      /**
       * A timeout after which the store becomes stored in the persistent store.
       */
      this.storeDebouncer = 100;
      /**
       * Makes `persist()` inactive when set.
       */
      this.disableAutoPersist = false;
    }

    /**
     * Stores state of the store in a debouncer.
     * This should be called each time a store state change.
     */
    persist() {
      if (this.disableAutoPersist) {
        return;
      }
      if (this[storeTimeoutValue]) {
        clearTimeout(this[storeTimeoutValue]);
      }
      this[storeTimeoutValue] = setTimeout(() => {
        this[storeTimeoutValue] = null;
        this.storeState();
      }, this.storeDebouncer);
    }

    /**
     * Stores current state of the store.
     * This to be implemented by the child classes to add the logic per data storage
     * capabilities.
     * @return {Promise<void>}
     * @abstract
     */
    async storeState() {
      //
    }

    /**
     * Restores the store state from the persistence layer and loads it into the store.
     * @return {Promise<boolean>} Whether a state has been restored.
     * @abstract
     */
    async restoreState() {
      return false;
    }
  }
  return StorePersistenceMixin;
};

/**
 * This mixin adds functions to persist metadata store in a persistance layer
 * like indexed db, local storage, file, etc.
 * 
 * The implementation must override the `storeState()` function that
 * performs the store task.
 * 
 * @mixin
 */
export const StorePersistenceMixin = dedupeMixin(mxFunction);
