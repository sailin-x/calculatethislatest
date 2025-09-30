export interface loss_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface loss_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface loss_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface loss_ratio_calculatorOutputs {
  result: number;
  analysis: loss_ratio_calculatorAnalysis;
}
