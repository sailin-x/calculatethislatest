export interface BondYieldInputs {
  faceValue: number;
  couponRate: number;
  yearsToMaturity: number;
  currentPrice: number;
  couponFrequency: number;
  settlementDate?: string;
  maturityDate?: string;
}

export interface BondYieldOutputs {
  yieldToMaturity: number;
  currentYield: number;
  yieldToCall?: number;
  yieldToWorst?: number;
  totalReturn: number;
  averageAnnualReturn: number;
  macaulayDuration: number;
  modifiedDuration: number;
  convexity: number;
}

export interface BondYieldMetrics {
  result: number;
  yieldToMaturity: number;
  currentYield: number;
  totalReturn: number;
}

export interface BondYieldAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  yieldQuality: string;
  durationRisk: number;
  convexityBenefit: string;
}