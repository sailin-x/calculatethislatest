export interface kidnap_ransom_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface kidnap_ransom_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface kidnap_ransom_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface kidnap_ransom_insurance_calculatorOutputs {
  result: number;
  analysis: kidnap_ransom_insurance_calculatorAnalysis;
}
