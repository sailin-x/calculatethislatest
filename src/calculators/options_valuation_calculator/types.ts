export interface options_valuation_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface options_valuation_calculatorResults {
  result: number;
  analysis?: string;
}

export interface options_valuation_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface options_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
