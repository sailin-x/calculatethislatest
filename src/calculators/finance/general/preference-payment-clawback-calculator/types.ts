export interface preference_payment_clawback_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface preference_payment_clawback_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface preference_payment_clawback_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface preference_payment_clawback_calculatorOutputs {
  result: number;
  analysis: preference_payment_clawback_calculatorAnalysis;
}
