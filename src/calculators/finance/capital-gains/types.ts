export interface CapitalGainsInputs {
  acquisitionPrice: number;
  salePrice: number;
  acquisitionDate: string;
  saleDate: string;
  quantity: number;
  acquisitionCosts: number;
  saleCosts: number;
  taxRate: number;
  inflationRate: number;
  holdingPeriod: 'short' | 'long';
}

export interface CapitalGainsOutputs {
  capitalGain: number;
  capitalLoss: number;
  netCapitalGain: number;
  taxableGain: number;
  taxOwed: number;
  afterTaxGain: number;
  totalReturn: number;
  annualizedReturn: number;
  realReturn: number;
  holdingPeriodDays: number;
  holdingPeriodYears: number;
}

export interface CapitalGainsMetrics {
  result: number;
  capitalGain: number;
  taxOwed: number;
  afterTaxGain: number;
}

export interface CapitalGainsAnalysis {
  recommendation: string;
  taxEfficiency: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  holdingPeriod: string;
  taxBracket: string;
}