export interface './finance/down-payment-assistance/down_payment_assistance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/down-payment-assistance/down_payment_assistance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/down-payment-assistance/down_payment_assistance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/down-payment-assistance/down_payment_assistance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
