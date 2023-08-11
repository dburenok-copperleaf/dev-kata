import { groupLimit } from "../constants/algo-constants";

export function splitToGroups(text: string): string[] {
  const result = [];
  for (let i = 0; i < text.length - 1; i += groupLimit) {
    result.push(text.substring(i, i + groupLimit));
  }
  return result;
}