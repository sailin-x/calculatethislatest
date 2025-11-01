export interface merchant_cash_advance_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface merchant_cash_advance_calculatorResults {
  result: number;
  analysis?: string;
}

export interface merchant_cash_advance_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface merchant_cash_advance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
