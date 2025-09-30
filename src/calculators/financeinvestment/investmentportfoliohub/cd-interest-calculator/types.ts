export interface cd_interest_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cd_interest_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cd_interest_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cd_interest_calculatorOutputs {
  result: number;
  analysis: cd_interest_calculatorAnalysis;
}
