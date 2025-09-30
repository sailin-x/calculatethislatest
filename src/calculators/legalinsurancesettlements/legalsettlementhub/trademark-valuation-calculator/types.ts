export interface trademark_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface trademark_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface trademark_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface trademark_valuation_calculatorOutputs {
  result: number;
  analysis: trademark_valuation_calculatorAnalysis;
}
