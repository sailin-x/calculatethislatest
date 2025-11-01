export interface BlackLittermanInputs {
  marketWeights: number[];
  marketReturns: number[];
  marketCovariance: number[][];
  investorViews: {
    assets: number[];
    returns: number[];
    confidences: number[];
  };
  riskAversion: number;
  tau: number;
}

export interface BlackLittermanOutputs {
  posteriorReturns: number[];
  posteriorCovariance: number[][];
  optimalWeights: number[];
  expectedReturn: number;
  portfolioVolatility: number;
  sharpeRatio: number;
  viewConfidence: number[];
  marketImpliedReturns: number[];
}

export interface BlackLittermanMetrics {
  result: number;
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
}

export interface BlackLittermanAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  diversificationScore: number;
  viewImpact: number;
  stabilityScore: number;
}