export interface film_distribution_waterfall_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface film_distribution_waterfall_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface film_distribution_waterfall_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface film_distribution_waterfall_calculatorOutputs {
  result: number;
  analysis: film_distribution_waterfall_calculatorAnalysis;
}
