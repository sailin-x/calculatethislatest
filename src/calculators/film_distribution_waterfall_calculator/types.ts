export interface film_distribution_waterfall_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface film_distribution_waterfall_calculatorResults {
  result: number;
  analysis?: string;
}

export interface film_distribution_waterfall_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface film_distribution_waterfall_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
