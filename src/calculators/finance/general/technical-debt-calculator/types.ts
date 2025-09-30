export interface technical_debt_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface technical_debt_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface technical_debt_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface technical_debt_calculatorOutputs {
  result: number;
  analysis: technical_debt_calculatorAnalysis;
}
