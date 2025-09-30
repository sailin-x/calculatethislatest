export interface CAGRInputs {
  beginningValue: number;
  endingValue: number;
  numberOfPeriods: number;
  periodType: 'years' | 'months' | 'days';
  includeDividends: boolean;
  dividendAmount: number;
  frequency: 'annual' | 'semi-annual' | 'quarterly' | 'monthly';
  inflationRate: number;
  taxRate: number;
}

export interface CAGRResults {
  cagr: number;
  totalReturn: number;
  annualizedReturn: number;
  realReturn: number;
  afterTaxReturn: number;
  volatilityEstimate: number;
  riskAdjustedReturn: number;
  compoundFrequency: string;
}

export interface CAGRMetrics {
  growthQuality: 'excellent' | 'good' | 'average' | 'poor';
  consistencyScore: number;
  benchmarkComparison: number;
  sustainabilityIndex: number;
}