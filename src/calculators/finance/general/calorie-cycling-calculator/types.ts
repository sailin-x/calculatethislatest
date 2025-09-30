export interface calorie_cycling_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface calorie_cycling_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface calorie_cycling_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface calorie_cycling_calculatorOutputs {
  result: number;
  analysis: calorie_cycling_calculatorAnalysis;
}
