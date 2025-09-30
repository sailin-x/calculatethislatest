export interface terrorism_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface terrorism_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface terrorism_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface terrorism_insurance_calculatorOutputs {
  result: number;
  analysis: terrorism_insurance_calculatorAnalysis;
}
