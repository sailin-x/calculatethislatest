export interface startup_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface startup_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface startup_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface startup_valuation_calculatorOutputs {
  result: number;
  analysis: startup_valuation_calculatorAnalysis;
}
