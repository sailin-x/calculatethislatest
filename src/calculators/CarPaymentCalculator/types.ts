export interface CarPaymentCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface CarPaymentCalculatorResults {
  result: number;
  analysis?: string;
}

export interface CarPaymentCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface CarPaymentCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
