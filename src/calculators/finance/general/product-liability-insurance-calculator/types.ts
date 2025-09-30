export interface product_liability_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface product_liability_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface product_liability_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface product_liability_insurance_calculatorOutputs {
  result: number;
  analysis: product_liability_insurance_calculatorAnalysis;
}
