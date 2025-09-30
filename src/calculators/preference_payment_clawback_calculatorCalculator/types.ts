export interface preference_payment_clawback_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface preference_payment_clawback_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface preference_payment_clawback_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface preference_payment_clawback_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
