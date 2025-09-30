export interface calories_burned_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface calories_burned_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface calories_burned_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface calories_burned_calculatorOutputs {
  result: number;
  analysis: calories_burned_calculatorAnalysis;
}
