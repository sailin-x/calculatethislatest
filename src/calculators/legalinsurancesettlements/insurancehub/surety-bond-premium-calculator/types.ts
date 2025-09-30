export interface surety_bond_premium_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface surety_bond_premium_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface surety_bond_premium_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface surety_bond_premium_calculatorOutputs {
  result: number;
  analysis: surety_bond_premium_calculatorAnalysis;
}
