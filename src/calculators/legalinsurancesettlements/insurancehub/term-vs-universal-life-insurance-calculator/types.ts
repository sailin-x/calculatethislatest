export interface term_vs_universal_life_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface term_vs_universal_life_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface term_vs_universal_life_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface term_vs_universal_life_insurance_calculatorOutputs {
  result: number;
  analysis: term_vs_universal_life_insurance_calculatorAnalysis;
}
