export interface './finance/down-payment-assistance/down-payment-assistance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/down-payment-assistance/down-payment-assistance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/down-payment-assistance/down-payment-assistance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/down-payment-assistance/down-payment-assistance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
