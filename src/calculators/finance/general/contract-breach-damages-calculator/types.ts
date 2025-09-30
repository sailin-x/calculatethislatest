export interface contract_breach_damages_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface contract_breach_damages_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface contract_breach_damages_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface contract_breach_damages_calculatorOutputs {
  result: number;
  analysis: contract_breach_damages_calculatorAnalysis;
}
