export interface fitness_age_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface fitness_age_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface fitness_age_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface fitness_age_calculatorOutputs {
  result: number;
  analysis: fitness_age_calculatorAnalysis;
}
