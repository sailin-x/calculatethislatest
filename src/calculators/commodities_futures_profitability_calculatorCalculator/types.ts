export interface commodities_futures_profitability_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface commodities_futures_profitability_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface commodities_futures_profitability_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface commodities_futures_profitability_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
