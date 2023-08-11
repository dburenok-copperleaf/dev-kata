import { MinMaxAvg } from "../types/submission-result.type";

export function getMinMaxAvg(timings: number[]): MinMaxAvg {
  return {
    min: Math.round(Math.min(...timings) * 100) / 100,
    max: Math.round(Math.max(...timings) * 100) / 100,
    avg: Math.round(average(timings) * 100) / 100,
  };
}

function average(nums: number[]): number {
  let total = 0;
  nums.forEach((num) => (total += num));
  return total / nums.length;
}
