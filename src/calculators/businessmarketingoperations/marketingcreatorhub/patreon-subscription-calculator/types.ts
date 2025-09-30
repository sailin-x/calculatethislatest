export interface patreon_subscription_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface patreon_subscription_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface patreon_subscription_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface patreon_subscription_calculatorOutputs {
  result: number;
  analysis: patreon_subscription_calculatorAnalysis;
}
