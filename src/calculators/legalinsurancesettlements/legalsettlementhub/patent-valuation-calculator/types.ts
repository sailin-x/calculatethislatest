export interface patent_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface patent_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface patent_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface patent_valuation_calculatorOutputs {
  result: number;
  analysis: patent_valuation_calculatorAnalysis;
}
