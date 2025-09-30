export interface catastrophic_injury_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface catastrophic_injury_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface catastrophic_injury_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface catastrophic_injury_calculatorOutputs {
  result: number;
  analysis: catastrophic_injury_calculatorAnalysis;
}
