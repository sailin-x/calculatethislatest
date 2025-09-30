export interface mortgage_apr_comparisonCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_apr_comparisonCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_apr_comparisonCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_apr_comparisonCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
