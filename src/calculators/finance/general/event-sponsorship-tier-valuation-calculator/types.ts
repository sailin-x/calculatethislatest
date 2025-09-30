export interface event_sponsorship_tier_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface event_sponsorship_tier_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface event_sponsorship_tier_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface event_sponsorship_tier_valuation_calculatorOutputs {
  result: number;
  analysis: event_sponsorship_tier_valuation_calculatorAnalysis;
}
