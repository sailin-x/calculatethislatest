export interface preference_payment_clawback_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface preference_payment_clawback_calculatorResults {
  result: number;
  analysis?: string;
}

export interface preference_payment_clawback_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface preference_payment_clawback_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
