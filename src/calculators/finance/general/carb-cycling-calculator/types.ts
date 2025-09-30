export interface carb_cycling_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface carb_cycling_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface carb_cycling_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface carb_cycling_calculatorOutputs {
  result: number;
  analysis: carb_cycling_calculatorAnalysis;
}
