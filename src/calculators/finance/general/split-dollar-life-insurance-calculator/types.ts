export interface split_dollar_life_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface split_dollar_life_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface split_dollar_life_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface split_dollar_life_insurance_calculatorOutputs {
  result: number;
  analysis: split_dollar_life_insurance_calculatorAnalysis;
}
