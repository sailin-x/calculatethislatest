export interface cloud_repatriation_savings_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cloud_repatriation_savings_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cloud_repatriation_savings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cloud_repatriation_savings_calculatorOutputs {
  result: number;
  analysis: cloud_repatriation_savings_calculatorAnalysis;
}
