export interface film_distribution_waterfall_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface film_distribution_waterfall_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface film_distribution_waterfall_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface film_distribution_waterfall_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
