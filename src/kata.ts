import { decompressString } from "./decompress";
import { compressHex } from "./compress";

export const TEAM_NAME = "Hash Heroes"; // <team-name>

// You can change the algorithm name, but you will not be able to override an algorithm's results once you submit
export const ALGORITHM_NAME = "Adaptive Omit v1.0.1"; // <algo-name>

// TODO future steps:
// instead of compressing runs of single characters, like we are doing, it might

/**
 * A function which compresses a hex string.
 * Here is a sample hex string: "0xfefefffffffffffeeffffffffffffffffffffefe"
 */
export function compress(rawHexString: string): string {
  return compressHex(rawHexString);
}


/**
 * A function which acts as the inverse of the compress function.
 * It decompresses the compressed hex string back into the original hex string.
 */
export function decompress(compressedString: string): string {
  return decompressString(compressedString);
}

