import Axios from "axios";
import { SubmissionResult } from "../types/submission-result.type";

const GET_TEST_STRINGS_URL = "https://getteststrings-qfyyyjacqa-uc.a.run.app";
const SUBMIT_URL = "https://submitresult-qfyyyjacqa-uc.a.run.app";
const kataToken = "cl-dev-kata";

export async function getTestStrings(): Promise<string[]> {
  return Axios.get(GET_TEST_STRINGS_URL).then((response) => response.data);
}

export async function submitResult(result: SubmissionResult) {
  return Axios.post(SUBMIT_URL, { ...result, kataToken }).then(
    (response) => response.data
  );
}
