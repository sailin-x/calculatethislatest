export interface CAGRInputs {
  initialValue: number;
  finalValue: number;
  timePeriod: number;
  timePeriodUnit: 'years' | 'months' | 'days';
  compoundingFrequency?: 'annual' | 'semi-annual' | 'quarterly' | 'monthly' | 'daily';
  additionalContributions?: number;
  contributionFrequency?: 'annual' | 'semi-annual' | 'quarterly' | 'monthly';
  inflationRate?: number;
  taxRate?: number;
  currency?: string;
}

export interface CAGROutputs {
  cagr: number;
  totalReturn: number;
  totalReturnPercentage: number;
  annualizedReturn: number;
  realCAGR: number; // After inflation
  afterTaxCAGR: number;
  compoundFrequency: number;
  futureValue: number;
  investmentMultiple: number;
  averageAnnualReturn: number;
  volatilityAdjustedCAGR?: number;
  riskAdjustedReturn?: number;
}