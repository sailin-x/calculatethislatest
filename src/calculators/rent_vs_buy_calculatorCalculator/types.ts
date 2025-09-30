export interface rent_vs_buy_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rent_vs_buy_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface rent_vs_buy_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rent_vs_buy_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
