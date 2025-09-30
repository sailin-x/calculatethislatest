export interface dash_diet_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dash_diet_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dash_diet_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dash_diet_calculatorOutputs {
  result: number;
  analysis: dash_diet_calculatorAnalysis;
}
