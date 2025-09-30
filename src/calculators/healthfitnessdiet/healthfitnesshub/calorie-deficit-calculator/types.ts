export interface calorie_deficit_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface calorie_deficit_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface calorie_deficit_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface calorie_deficit_calculatorOutputs {
  result: number;
  analysis: calorie_deficit_calculatorAnalysis;
}
