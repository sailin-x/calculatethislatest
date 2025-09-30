export interface food_combining_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface food_combining_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface food_combining_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface food_combining_calculatorOutputs {
  result: number;
  analysis: food_combining_calculatorAnalysis;
}
