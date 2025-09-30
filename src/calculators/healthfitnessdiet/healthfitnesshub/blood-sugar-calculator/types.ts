export interface blood_sugar_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface blood_sugar_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface blood_sugar_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface blood_sugar_calculatorOutputs {
  result: number;
  analysis: blood_sugar_calculatorAnalysis;
}
