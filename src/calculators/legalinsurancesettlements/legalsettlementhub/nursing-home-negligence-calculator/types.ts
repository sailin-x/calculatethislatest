export interface nursing_home_negligence_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface nursing_home_negligence_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface nursing_home_negligence_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface nursing_home_negligence_calculatorOutputs {
  result: number;
  analysis: nursing_home_negligence_calculatorAnalysis;
}
