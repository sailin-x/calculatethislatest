export interface ad_reach_and_frequency_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface ad_reach_and_frequency_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface ad_reach_and_frequency_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ad_reach_and_frequency_calculatorOutputs {
  result: number;
  analysis: ad_reach_and_frequency_calculatorAnalysis;
}
