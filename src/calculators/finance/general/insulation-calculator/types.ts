export interface insulation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface insulation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface insulation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface insulation_calculatorOutputs {
  result: number;
  analysis: insulation_calculatorAnalysis;
}
