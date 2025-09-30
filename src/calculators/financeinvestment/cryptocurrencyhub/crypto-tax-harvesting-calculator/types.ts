export interface crypto_tax_harvesting_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface crypto_tax_harvesting_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface crypto_tax_harvesting_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface crypto_tax_harvesting_calculatorOutputs {
  result: number;
  analysis: crypto_tax_harvesting_calculatorAnalysis;
}
