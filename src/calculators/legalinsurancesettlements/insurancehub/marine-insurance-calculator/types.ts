export interface marine_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface marine_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface marine_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface marine_insurance_calculatorOutputs {
  result: number;
  analysis: marine_insurance_calculatorAnalysis;
}
