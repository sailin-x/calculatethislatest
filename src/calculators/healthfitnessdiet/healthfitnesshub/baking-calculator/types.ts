export interface baking_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface baking_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface baking_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface baking_calculatorOutputs {
  result: number;
  analysis: baking_calculatorAnalysis;
}
