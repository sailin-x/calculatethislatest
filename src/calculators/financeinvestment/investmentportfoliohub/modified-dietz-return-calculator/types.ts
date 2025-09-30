export interface modified_dietz_return_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface modified_dietz_return_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface modified_dietz_return_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface modified_dietz_return_calculatorOutputs {
  result: number;
  analysis: modified_dietz_return_calculatorAnalysis;
}
