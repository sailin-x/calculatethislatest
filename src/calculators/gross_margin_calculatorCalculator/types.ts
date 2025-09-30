export interface gross_margin_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface gross_margin_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface gross_margin_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface gross_margin_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
