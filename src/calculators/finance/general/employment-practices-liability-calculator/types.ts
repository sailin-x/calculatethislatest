export interface employment_practices_liability_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface employment_practices_liability_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface employment_practices_liability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface employment_practices_liability_calculatorOutputs {
  result: number;
  analysis: employment_practices_liability_calculatorAnalysis;
}
