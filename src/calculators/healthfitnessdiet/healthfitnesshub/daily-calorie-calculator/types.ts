export interface daily_calorie_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface daily_calorie_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface daily_calorie_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface daily_calorie_calculatorOutputs {
  result: number;
  analysis: daily_calorie_calculatorAnalysis;
}
