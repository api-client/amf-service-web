import { StorePersistence } from "../../src/lib/StorePersistence.js";

export class DemoPersistance extends StorePersistence {
  constructor(public id: string) {
    super();
  }

  async storeState(): Promise<void> {
    console.log("storeState");
  }

  async restoreState(): Promise<boolean> {
    console.log("restoreState");
    return false;
  } 
}
