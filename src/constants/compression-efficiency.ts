export function getCompressionEfficiency(
  testStrings: string[],
  compressedLengths: number[]
): number {
  let originalLength = 0;
  let compressedLength = 0;

  for (let i = 0; i < testStrings.length; i++) {
    originalLength += testStrings[i].length;
    compressedLength += compressedLengths[i];
  }

  return Math.min(
    999,
    Math.round((originalLength / compressedLength) * 100) / 100
  );
}
