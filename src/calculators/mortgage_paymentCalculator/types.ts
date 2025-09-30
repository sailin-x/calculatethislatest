export interface mortgage_paymentCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_paymentCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_paymentCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_paymentCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
