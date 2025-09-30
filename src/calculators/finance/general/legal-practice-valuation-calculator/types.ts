export interface legal_practice_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface legal_practice_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface legal_practice_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface legal_practice_valuation_calculatorOutputs {
  result: number;
  analysis: legal_practice_valuation_calculatorAnalysis;
}
