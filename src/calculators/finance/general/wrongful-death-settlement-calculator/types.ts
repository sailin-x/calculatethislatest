export interface wrongful_death_settlement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface wrongful_death_settlement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface wrongful_death_settlement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface wrongful_death_settlement_calculatorOutputs {
  result: number;
  analysis: wrongful_death_settlement_calculatorAnalysis;
}
