export interface bitcoin_pizza_day_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bitcoin_pizza_day_calculatorResults {
  result: number;
  analysis?: string;
}

export interface bitcoin_pizza_day_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bitcoin_pizza_day_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
