export interface compound_annual_growth_rate_cagr_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface compound_annual_growth_rate_cagr_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface compound_annual_growth_rate_cagr_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface compound_annual_growth_rate_cagr_calculatorOutputs {
  result: number;
  analysis: compound_annual_growth_rate_cagr_calculatorAnalysis;
}
