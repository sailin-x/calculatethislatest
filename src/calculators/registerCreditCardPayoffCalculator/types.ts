export interface registerCreditCardPayoffCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerCreditCardPayoffCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerCreditCardPayoffCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerCreditCardPayoffCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
