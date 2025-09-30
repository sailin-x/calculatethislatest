export interface sum_of_parts_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface sum_of_parts_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface sum_of_parts_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface sum_of_parts_calculatorOutputs {
  result: number;
  analysis: sum_of_parts_calculatorAnalysis;
}
