export interface spin_off_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface spin_off_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface spin_off_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface spin_off_calculatorOutputs {
  result: number;
  analysis: spin_off_calculatorAnalysis;
}
