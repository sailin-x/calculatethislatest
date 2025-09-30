export interface prenuptial_agreement_value_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface prenuptial_agreement_value_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface prenuptial_agreement_value_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface prenuptial_agreement_value_calculatorOutputs {
  result: number;
  analysis: prenuptial_agreement_value_calculatorAnalysis;
}
