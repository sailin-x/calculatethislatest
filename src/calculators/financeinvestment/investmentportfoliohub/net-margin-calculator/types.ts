export interface net_margin_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface net_margin_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface net_margin_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface net_margin_calculatorOutputs {
  result: number;
  analysis: net_margin_calculatorAnalysis;
}
