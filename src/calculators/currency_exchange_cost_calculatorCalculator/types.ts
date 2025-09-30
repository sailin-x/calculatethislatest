export interface currency_exchange_cost_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface currency_exchange_cost_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface currency_exchange_cost_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface currency_exchange_cost_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
