export interface './finance/escrow-analysis/escrow-analysis';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/escrow-analysis/escrow-analysis';Results {
  result: number;
  analysis?: string;
}

export interface './finance/escrow-analysis/escrow-analysis';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/escrow-analysis/escrow-analysis';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
