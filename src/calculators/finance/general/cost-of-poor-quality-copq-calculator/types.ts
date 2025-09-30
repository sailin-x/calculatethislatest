export interface cost_of_poor_quality_copq_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cost_of_poor_quality_copq_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cost_of_poor_quality_copq_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cost_of_poor_quality_copq_calculatorOutputs {
  result: number;
  analysis: cost_of_poor_quality_copq_calculatorAnalysis;
}
