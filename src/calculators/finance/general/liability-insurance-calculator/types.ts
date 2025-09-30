export interface liability_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface liability_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface liability_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface liability_insurance_calculatorOutputs {
  result: number;
  analysis: liability_insurance_calculatorAnalysis;
}
