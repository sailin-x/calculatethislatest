export interface heart_rate_zone_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface heart_rate_zone_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface heart_rate_zone_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface heart_rate_zone_calculatorOutputs {
  result: number;
  analysis: heart_rate_zone_calculatorAnalysis;
}
