export interface gross_margin_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface gross_margin_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface gross_margin_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface gross_margin_calculatorOutputs {
  result: number;
  analysis: gross_margin_calculatorAnalysis;
}
