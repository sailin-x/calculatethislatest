export interface disability_insurance_needs_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface disability_insurance_needs_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface disability_insurance_needs_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface disability_insurance_needs_calculatorOutputs {
  result: number;
  analysis: disability_insurance_needs_calculatorAnalysis;
}
