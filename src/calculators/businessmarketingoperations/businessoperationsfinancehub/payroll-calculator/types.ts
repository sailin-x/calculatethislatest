export interface payroll_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface payroll_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface payroll_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface payroll_calculatorOutputs {
  result: number;
  analysis: payroll_calculatorAnalysis;
}
