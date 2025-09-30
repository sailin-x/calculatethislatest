export interface personal_injury_multiplier_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface personal_injury_multiplier_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface personal_injury_multiplier_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface personal_injury_multiplier_calculatorOutputs {
  result: number;
  analysis: personal_injury_multiplier_calculatorAnalysis;
}
