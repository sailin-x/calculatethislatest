export interface './finance/reverse-mortgage/reverse_mortgage';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/reverse-mortgage/reverse_mortgage';Results {
  result: number;
  analysis?: string;
}

export interface './finance/reverse-mortgage/reverse_mortgage';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/reverse-mortgage/reverse_mortgage';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
