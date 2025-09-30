export interface './finance/mortgage-payment/mortgage_payment';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-payment/mortgage_payment';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-payment/mortgage_payment';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-payment/mortgage_payment';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
