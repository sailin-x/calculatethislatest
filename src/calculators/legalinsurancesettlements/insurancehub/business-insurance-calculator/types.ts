export interface business_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface business_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface business_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface business_insurance_calculatorOutputs {
  result: number;
  analysis: business_insurance_calculatorAnalysis;
}
