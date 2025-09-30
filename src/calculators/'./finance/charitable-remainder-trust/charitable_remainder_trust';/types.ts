export interface './finance/charitable-remainder-trust/charitable_remainder_trust';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/charitable-remainder-trust/charitable_remainder_trust';Results {
  result: number;
  analysis?: string;
}

export interface './finance/charitable-remainder-trust/charitable_remainder_trust';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/charitable-remainder-trust/charitable_remainder_trust';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
