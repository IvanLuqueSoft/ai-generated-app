export type TestMode = 'time' | 'words' | 'code';

export type TestConfig = {
  mode: TestMode;
  value: number;
};

export type TestResults = {
  wpm: number;
  accuracy: number;
  history: { time: number; wpm: number }[];
  rawWpm: number;
  errors: number;
};