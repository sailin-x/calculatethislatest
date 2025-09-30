export interface annuity_buyout_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface annuity_buyout_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface annuity_buyout_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface annuity_buyout_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
