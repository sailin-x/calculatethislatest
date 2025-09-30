export interface heart_rate_variability_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface heart_rate_variability_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface heart_rate_variability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface heart_rate_variability_calculatorOutputs {
  result: number;
  analysis: heart_rate_variability_calculatorAnalysis;
}
