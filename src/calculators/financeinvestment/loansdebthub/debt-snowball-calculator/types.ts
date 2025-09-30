export interface debt_snowball_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface debt_snowball_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface debt_snowball_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface debt_snowball_calculatorOutputs {
  result: number;
  analysis: debt_snowball_calculatorAnalysis;
}
