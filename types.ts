
export interface SummaryResult {
  points: string[];
  originalWordCount: number;
  summaryWordCount: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
