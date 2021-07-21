import { ApiConfiguration, ApiGenerationOptions } from "./types";
/**
 * Parses the API models to prepare it for tests and demo pages
 * @param init Either path to the api list file or the list of files to parse.
 * @param opts Optional parsing options.
 */
export default function main(init: Map<string, ApiConfiguration>, opts?: ApiGenerationOptions): Promise<void>;
/**
 * Runs the default function and exists the process when failed.
 * @param init Either path to the api list file or the list of files to parse.
 * @param opts Optional parsing options.
 */
export function generate(init: Map<string, ApiConfiguration>, opts?: ApiGenerationOptions): Promise<void>;
