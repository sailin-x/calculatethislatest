export interface DividendCalculatorInputs {
  stockPrice: number;
  annualDividend: number;
  dividendFrequency: 'annual' | 'semi-annual' | 'quarterly' | 'monthly';
  holdingPeriod?: number; // in years
}

export interface DividendCalculatorMetrics {
  dividendYield: number;
  annualDividendIncome: number;
  totalDividendIncome: number;
  dividendPayoutRatio: number;
  dividendCoverageRatio: number;
}

export interface DividendCalculatorAnalysis {
  yieldQuality: 'low' | 'moderate' | 'high' | 'excellent';
  sustainability: 'poor' | 'fair' | 'good' | 'excellent';
  recommendations: string[];
  riskFactors: string[];
}

export interface DividendCalculatorOutputs {
  dividendYield: number;
  annualDividendIncome: number;
  totalDividendIncome: number;
  dividendPayoutRatio: number;
  dividendCoverageRatio: number;
  analysis: DividendCalculatorAnalysis;
}
