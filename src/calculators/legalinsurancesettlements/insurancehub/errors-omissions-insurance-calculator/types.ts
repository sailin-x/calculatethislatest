export interface errors_omissions_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface errors_omissions_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface errors_omissions_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface errors_omissions_insurance_calculatorOutputs {
  result: number;
  analysis: errors_omissions_insurance_calculatorAnalysis;
}
