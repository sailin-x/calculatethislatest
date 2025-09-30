export interface pharmaceutical_liability_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface pharmaceutical_liability_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface pharmaceutical_liability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface pharmaceutical_liability_calculatorOutputs {
  result: number;
  analysis: pharmaceutical_liability_calculatorAnalysis;
}
