export interface fund_level_irr_tvpi_and_dpi_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fund_level_irr_tvpi_and_dpi_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fund_level_irr_tvpi_and_dpi_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fund_level_irr_tvpi_and_dpi_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
