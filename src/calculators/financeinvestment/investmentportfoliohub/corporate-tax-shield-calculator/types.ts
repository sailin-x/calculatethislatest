export interface corporate_tax_shield_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface corporate_tax_shield_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface corporate_tax_shield_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface corporate_tax_shield_calculatorOutputs {
  result: number;
  analysis: corporate_tax_shield_calculatorAnalysis;
}
