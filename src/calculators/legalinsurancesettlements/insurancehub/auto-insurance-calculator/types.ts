export interface auto_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface auto_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface auto_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface auto_insurance_calculatorOutputs {
  result: number;
  analysis: auto_insurance_calculatorAnalysis;
}
