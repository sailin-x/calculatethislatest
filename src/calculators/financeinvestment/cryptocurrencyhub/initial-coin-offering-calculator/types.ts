export interface initial_coin_offering_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface initial_coin_offering_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface initial_coin_offering_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface initial_coin_offering_calculatorOutputs {
  result: number;
  analysis: initial_coin_offering_calculatorAnalysis;
}
