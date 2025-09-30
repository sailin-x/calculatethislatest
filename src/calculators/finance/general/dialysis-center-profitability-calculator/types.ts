export interface dialysis_center_profitability_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dialysis_center_profitability_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dialysis_center_profitability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dialysis_center_profitability_calculatorOutputs {
  result: number;
  analysis: dialysis_center_profitability_calculatorAnalysis;
}
