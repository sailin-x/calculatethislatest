export interface long_term_disability_ltd_elimination_period_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface long_term_disability_ltd_elimination_period_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface long_term_disability_ltd_elimination_period_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface long_term_disability_ltd_elimination_period_calculatorOutputs {
  result: number;
  analysis: long_term_disability_ltd_elimination_period_calculatorAnalysis;
}
