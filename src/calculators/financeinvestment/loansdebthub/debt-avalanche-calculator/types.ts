export interface debt_avalanche_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface debt_avalanche_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface debt_avalanche_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface debt_avalanche_calculatorOutputs {
  result: number;
  analysis: debt_avalanche_calculatorAnalysis;
}
