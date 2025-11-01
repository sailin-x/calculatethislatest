export interface stock_options_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface stock_options_calculatorResults {
  result: number;
  analysis?: string;
}

export interface stock_options_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface stock_options_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
