export interface operating_margin_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface operating_margin_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface operating_margin_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface operating_margin_calculatorOutputs {
  result: number;
  analysis: operating_margin_calculatorAnalysis;
}
