export interface required_minimum_distribution_rmd_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface required_minimum_distribution_rmd_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface required_minimum_distribution_rmd_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface required_minimum_distribution_rmd_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
