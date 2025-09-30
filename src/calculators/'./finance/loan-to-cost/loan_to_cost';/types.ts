export interface './finance/loan-to-cost/loan_to_cost';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/loan-to-cost/loan_to_cost';Results {
  result: number;
  analysis?: string;
}

export interface './finance/loan-to-cost/loan_to_cost';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/loan-to-cost/loan_to_cost';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
