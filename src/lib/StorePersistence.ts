export const storeTimeoutValue = Symbol('storeTimeoutValue');

/**
 * A base class that provides store persistance.
 */
export abstract class StorePersistence {
  /**
   * A timeout after which the store becomes stored in the persistent store.
   */
  storeDebouncer = 100;
  /**
   * Makes `persist()` inactive when set.
   */
  disableAutoPersist = false;

  [storeTimeoutValue]: number | null = null;

  /**
   * Stores state of the store in a debouncer.
   * This should be called each time a store state change.
   */
  persist(): void {
    if (this.disableAutoPersist) {
      return;
    }
    if (this[storeTimeoutValue]) {
      clearTimeout(this[storeTimeoutValue]);
    }
    this[storeTimeoutValue] = setTimeout(() => {
      this[storeTimeoutValue] = null;
      this.storeState();
    }, this.storeDebouncer) as unknown as number;
  }

  /**
   * Stores current state of the store.
   * This to be implemented by the child classes to add the logic per data storage
   * capabilities.
   */
  abstract storeState(): Promise<void>;

  /**
   * Restores the store state from the persistence layer and loads it into the store.
   * Whether a state has been restored.
   */
  abstract restoreState(): Promise<boolean>;
}
