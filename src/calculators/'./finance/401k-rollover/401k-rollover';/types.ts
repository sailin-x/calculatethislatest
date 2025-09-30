export interface './finance/401k-rollover/401k-rollover';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/401k-rollover/401k-rollover';Results {
  result: number;
  analysis?: string;
}

export interface './finance/401k-rollover/401k-rollover';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/401k-rollover/401k-rollover';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
