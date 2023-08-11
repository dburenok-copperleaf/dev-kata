import { execFile } from "child_process";
import { getTestStrings, submitResult } from "../api-service/api-service";
import { getCompressionEfficiency } from "../constants/compression-efficiency";
import { getMinMaxAvg } from "../constants/min-max-avg";
import { ALGORITHM_NAME, compress, decompress, TEAM_NAME } from "../kata";
import { performance } from "node:perf_hooks";
import { SubmissionResult } from "../types/submission-result.type";

async function submit() {
  console.log("Running tests...");

  const testStrings = await getTestStrings();
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
  console.log("Submitting results...");
  const result: SubmissionResult = {
    teamName: TEAM_NAME,
    algorithmName: ALGORITHM_NAME,
    timeTaken: getMinMaxAvg(timings),
    compressedLength: getMinMaxAvg(compressedLengths),
    compressionEfficiency: getCompressionEfficiency(
      testStrings,
      compressedLengths
    ),
    decompressionSuccessful,
  };

  try {
    const response = await submitResult(result);
    console.log(
      `Submitted successfully! ID: ${response._path.segments.join("/")}`
    );
  } catch (e: any) {
    console.error(`[ERROR] Failed to submit:`, e);
  }
}

submit();
