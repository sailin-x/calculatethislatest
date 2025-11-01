export interface CalmarRatioInputs {
  portfolioValues: number[];
  timePeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  riskFreeRate: number;
  benchmarkValues?: number[];
}

export interface CalmarRatioOutputs {
  calmarRatio: number;
  annualizedReturn: number;
  maximumDrawdown: number;
  sharpeRatio: number;
  sortinoRatio: number;
  recoveryTime: number;
  volatility: number;
  downsideDeviation: number;
}

export interface CalmarRatioMetrics {
  result: number;
  calmarRatio: number;
  annualizedReturn: number;
  maximumDrawdown: number;
}

export interface CalmarRatioAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  performanceRating: string;
  drawdownSeverity: number;
  consistencyScore: number;
}