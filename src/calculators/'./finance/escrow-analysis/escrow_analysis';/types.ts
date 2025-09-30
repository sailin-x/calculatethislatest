export interface './finance/escrow-analysis/escrow_analysis';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/escrow-analysis/escrow_analysis';Results {
  result: number;
  analysis?: string;
}

export interface './finance/escrow-analysis/escrow_analysis';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/escrow-analysis/escrow_analysis';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
