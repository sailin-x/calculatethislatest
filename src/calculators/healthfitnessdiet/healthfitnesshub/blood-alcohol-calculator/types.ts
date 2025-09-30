export interface blood_alcohol_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface blood_alcohol_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface blood_alcohol_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface blood_alcohol_calculatorOutputs {
  result: number;
  analysis: blood_alcohol_calculatorAnalysis;
}
