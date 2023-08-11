import { getCompressionEfficiency } from "../constants/compression-efficiency";
import { LOCAL_TEST_STRINGS } from "../constants/local-test-strings";
import { getMinMaxAvg } from "../constants/min-max-avg";
import { ALGORITHM_NAME, compress, decompress, TEAM_NAME } from "../kata";
import { performance } from "node:perf_hooks";
import { SubmissionResult } from "../types/submission-result.type";

async function test() {
  console.log("Running local tests...");
  const testStrings = pickTestStrings(LOCAL_TEST_STRINGS);
  const timings: number[] = [];
  const compressedLengths: number[] = [];
  let decompressionSuccessful = true;

  for (const testString of testStrings) {
    const t0 = performance.now();
    const compressedString = compress(testString);
    const timeTaken = performance.now() - t0;

    timings.push(timeTaken);
    compressedLengths.push(compressedString.length);

    if (decompress(compressedString) !== testString) {
      decompressionSuccessful = false;
    }
  }
  console.log("Done!");
  console.log(
    getLocalTestResultString({
      teamName: TEAM_NAME,
      algorithmName: ALGORITHM_NAME,
      timeTaken: getMinMaxAvg(timings),
      compressedLength: getMinMaxAvg(compressedLengths),
      compressionEfficiency: getCompressionEfficiency(
        testStrings,
        compressedLengths
      ),
      decompressionSuccessful,
    })
  );
}

test();

function pickTestStrings(testStrings: string[]) {
  const shuffled = testStrings.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

function getLocalTestResultString(result: SubmissionResult) {
  return `Team Name: ${result.teamName}\nAlgorithm Name: ${result.algorithmName}\nTime Taken: Min ${result.timeTaken.min}ms, Max ${result.timeTaken.max}ms, Avg ${result.timeTaken.avg}ms\nCompressed Length: Min ${result.compressedLength.min}, Max ${result.compressedLength.max}, Avg ${result.compressedLength.avg}\nDecompression Successful: ${result.decompressionSuccessful}\nCompression Efficiency: ${result.compressionEfficiency}`;
}
