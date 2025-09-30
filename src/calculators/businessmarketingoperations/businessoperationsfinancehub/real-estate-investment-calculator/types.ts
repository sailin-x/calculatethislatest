export interface real_estate_investment_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface real_estate_investment_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface real_estate_investment_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface real_estate_investment_calculatorOutputs {
  result: number;
  analysis: real_estate_investment_calculatorAnalysis;
}
