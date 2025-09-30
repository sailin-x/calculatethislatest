export interface commercial_auto_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface commercial_auto_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface commercial_auto_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface commercial_auto_insurance_calculatorOutputs {
  result: number;
  analysis: commercial_auto_insurance_calculatorAnalysis;
}
