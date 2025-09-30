export interface distressed_debt_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface distressed_debt_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface distressed_debt_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface distressed_debt_calculatorOutputs {
  result: number;
  analysis: distressed_debt_calculatorAnalysis;
}
