export interface directors_officers_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface directors_officers_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface directors_officers_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface directors_officers_insurance_calculatorOutputs {
  result: number;
  analysis: directors_officers_insurance_calculatorAnalysis;
}
