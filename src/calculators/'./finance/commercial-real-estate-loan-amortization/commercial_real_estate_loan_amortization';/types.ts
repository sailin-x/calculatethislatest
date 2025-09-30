export interface './finance/commercial-real-estate-loan-amortization/commercial_real_estate_loan_amortization';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/commercial-real-estate-loan-amortization/commercial_real_estate_loan_amortization';Results {
  result: number;
  analysis?: string;
}

export interface './finance/commercial-real-estate-loan-amortization/commercial_real_estate_loan_amortization';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/commercial-real-estate-loan-amortization/commercial_real_estate_loan_amortization';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
