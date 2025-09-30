export interface compound_annual_growth_rate_cagr_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface compound_annual_growth_rate_cagr_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface compound_annual_growth_rate_cagr_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface compound_annual_growth_rate_cagr_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
