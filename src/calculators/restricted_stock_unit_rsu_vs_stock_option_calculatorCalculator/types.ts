export interface restricted_stock_unit_rsu_vs_stock_option_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface restricted_stock_unit_rsu_vs_stock_option_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface restricted_stock_unit_rsu_vs_stock_option_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface restricted_stock_unit_rsu_vs_stock_option_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
