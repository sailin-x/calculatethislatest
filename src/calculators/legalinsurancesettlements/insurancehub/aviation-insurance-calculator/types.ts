export interface aviation_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface aviation_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface aviation_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface aviation_insurance_calculatorOutputs {
  result: number;
  analysis: aviation_insurance_calculatorAnalysis;
}
