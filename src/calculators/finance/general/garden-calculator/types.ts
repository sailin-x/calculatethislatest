export interface garden_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface garden_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface garden_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface garden_calculatorOutputs {
  result: number;
  analysis: garden_calculatorAnalysis;
}
