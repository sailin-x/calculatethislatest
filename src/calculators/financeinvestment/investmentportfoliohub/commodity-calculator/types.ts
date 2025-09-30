export interface commodity_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface commodity_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface commodity_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface commodity_calculatorOutputs {
  result: number;
  analysis: commodity_calculatorAnalysis;
}
