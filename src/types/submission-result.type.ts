export type MinMaxAvg = {
  min: number;
  max: number;
  avg: number;
};

export type SubmissionResult = {
  teamName: string;
  algorithmName: string;
  timeTaken: MinMaxAvg;
  compressedLength: MinMaxAvg;
  decompressionSuccessful: boolean;
  compressionEfficiency: number;
};
