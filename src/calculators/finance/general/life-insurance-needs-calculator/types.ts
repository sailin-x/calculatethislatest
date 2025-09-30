export interface life_insurance_needs_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface life_insurance_needs_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface life_insurance_needs_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface life_insurance_needs_calculatorOutputs {
  result: number;
  analysis: life_insurance_needs_calculatorAnalysis;
}
