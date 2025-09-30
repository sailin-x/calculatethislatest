export interface cheat_meal_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cheat_meal_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cheat_meal_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cheat_meal_calculatorOutputs {
  result: number;
  analysis: cheat_meal_calculatorAnalysis;
}
