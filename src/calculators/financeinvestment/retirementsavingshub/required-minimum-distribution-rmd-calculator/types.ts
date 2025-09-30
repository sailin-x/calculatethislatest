export interface required_minimum_distribution_rmd_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface required_minimum_distribution_rmd_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface required_minimum_distribution_rmd_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface required_minimum_distribution_rmd_calculatorOutputs {
  result: number;
  analysis: required_minimum_distribution_rmd_calculatorAnalysis;
}
