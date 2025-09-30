export interface './finance/interest-only-mortgage/interest-only-mortgage';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/interest-only-mortgage/interest-only-mortgage';Results {
  result: number;
  analysis?: string;
}

export interface './finance/interest-only-mortgage/interest-only-mortgage';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/interest-only-mortgage/interest-only-mortgage';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
