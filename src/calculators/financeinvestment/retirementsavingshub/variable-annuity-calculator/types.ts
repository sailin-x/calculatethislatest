export interface variable_annuity_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface variable_annuity_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface variable_annuity_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface variable_annuity_calculatorOutputs {
  result: number;
  analysis: variable_annuity_calculatorAnalysis;
}
