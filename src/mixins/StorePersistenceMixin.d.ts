export declare function StorePersistenceMixin<T extends new (...args: any[]) => {}>(base: T): T & StorePersistenceMixinConstructor;
export declare interface StorePersistenceMixinConstructor {
  new(...args: any[]): StorePersistenceMixin;
  constructor(...args: any[]): StorePersistenceMixin;
}
export declare interface StorePersistenceMixin {
  /**
   * A timeout after which the store becomes stored in the persistent store.
   */
  storeDebouncer: number;
  /**
   * Makes `persist()` inactive when set.
   */
  disableAutoPersist: boolean;

  /**
   * Stores state of the store in a debouncer.
   * This should be called each time a store state change.
   */
  persist(): void;

  /**
   * Stores current state of the store.
   * This to be implemented by the child classes to add the logic per data storage
   * capabilities.
   * @abstract
   */
  storeState(): Promise<void>;

  /**
   * Restores the store state from the persistence layer and loads it into the store.
   * @return Whether a state has been restored.
   * @abstract
   */
  restoreState(): Promise<boolean>;
}
