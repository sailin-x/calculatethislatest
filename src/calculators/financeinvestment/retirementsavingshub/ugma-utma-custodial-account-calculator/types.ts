export interface ugma_utma_custodial_account_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface ugma_utma_custodial_account_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface ugma_utma_custodial_account_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ugma_utma_custodial_account_calculatorOutputs {
  result: number;
  analysis: ugma_utma_custodial_account_calculatorAnalysis;
}
