export const delineator = ":";
export const groupDelineator = ";";
export const groupLimit = 32 * 6;

export const hexChars = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']);


export function test(actual: any, expected: any) {
  if (actual !== expected) {
    throw `actual: ${actual}, expected: ${expected}`;
  }
}