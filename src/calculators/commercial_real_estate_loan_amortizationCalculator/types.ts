export interface commercial_real_estate_loan_amortizationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface commercial_real_estate_loan_amortizationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface commercial_real_estate_loan_amortizationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface commercial_real_estate_loan_amortizationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
