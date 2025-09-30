export interface long_term_care_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface long_term_care_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface long_term_care_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface long_term_care_insurance_calculatorOutputs {
  result: number;
  analysis: long_term_care_insurance_calculatorAnalysis;
}
