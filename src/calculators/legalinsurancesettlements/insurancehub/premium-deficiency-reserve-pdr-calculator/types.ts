export interface premium_deficiency_reserve_pdr_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface premium_deficiency_reserve_pdr_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface premium_deficiency_reserve_pdr_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface premium_deficiency_reserve_pdr_calculatorOutputs {
  result: number;
  analysis: premium_deficiency_reserve_pdr_calculatorAnalysis;
}
