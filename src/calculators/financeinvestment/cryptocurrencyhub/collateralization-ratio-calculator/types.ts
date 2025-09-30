export interface collateralization_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface collateralization_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface collateralization_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface collateralization_ratio_calculatorOutputs {
  result: number;
  analysis: collateralization_ratio_calculatorAnalysis;
}
