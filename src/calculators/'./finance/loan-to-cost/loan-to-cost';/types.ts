export interface './finance/loan-to-cost/loan-to-cost';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/loan-to-cost/loan-to-cost';Results {
  result: number;
  analysis?: string;
}

export interface './finance/loan-to-cost/loan-to-cost';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/loan-to-cost/loan-to-cost';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
