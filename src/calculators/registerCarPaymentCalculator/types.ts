export interface registerCarPaymentCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerCarPaymentCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerCarPaymentCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerCarPaymentCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
