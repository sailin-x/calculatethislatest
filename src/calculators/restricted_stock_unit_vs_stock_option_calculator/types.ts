export interface restricted_stock_unit_vs_stock_option_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface restricted_stock_unit_vs_stock_option_calculatorResults {
  result: number;
  analysis?: string;
}

export interface restricted_stock_unit_vs_stock_option_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface restricted_stock_unit_vs_stock_option_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
