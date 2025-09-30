export interface initial_coin_offering_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface initial_coin_offering_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface initial_coin_offering_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface initial_coin_offering_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
