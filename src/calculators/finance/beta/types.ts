export interface BetaInputs {
  stockReturns: number[];
  marketReturns: number[];
  riskFreeRate: number;
  timePeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  benchmarkIndex: string;
  confidenceLevel: number;
}

export interface BetaOutputs {
  beta: number;
  alpha: number;
  rSquared: number;
  standardError: number;
  correlation: number;
  volatility: number;
  marketVolatility: number;
  sharpeRatio: number;
  systematicRisk: number;
  unsystematicRisk: number;
  totalRisk: number;
}

export interface BetaMetrics {
  result: number;
  beta: number;
  volatility: number;
  correlation: number;
}

export interface BetaAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  marketSensitivity: number;
  diversificationBenefit: number;
  stabilityScore: number;
}