export interface './finance/college-cost/college-cost';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/college-cost/college-cost';Results {
  result: number;
  analysis?: string;
}

export interface './finance/college-cost/college-cost';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/college-cost/college-cost';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
