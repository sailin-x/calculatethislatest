export interface options_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface options_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface options_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface options_valuation_calculatorOutputs {
  result: number;
  analysis: options_valuation_calculatorAnalysis;
}
