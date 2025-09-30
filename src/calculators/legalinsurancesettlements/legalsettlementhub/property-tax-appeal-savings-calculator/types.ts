export interface property_tax_appeal_savings_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface property_tax_appeal_savings_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface property_tax_appeal_savings_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface property_tax_appeal_savings_calculatorOutputs {
  result: number;
  analysis: property_tax_appeal_savings_calculatorAnalysis;
}
