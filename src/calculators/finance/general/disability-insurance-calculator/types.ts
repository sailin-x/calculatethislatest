export interface disability_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface disability_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface disability_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface disability_insurance_calculatorOutputs {
  result: number;
  analysis: disability_insurance_calculatorAnalysis;
}
