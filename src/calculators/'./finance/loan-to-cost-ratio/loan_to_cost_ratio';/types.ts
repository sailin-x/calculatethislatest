export interface './finance/loan-to-cost-ratio/loan_to_cost_ratio';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/loan-to-cost-ratio/loan_to_cost_ratio';Results {
  result: number;
  analysis?: string;
}

export interface './finance/loan-to-cost-ratio/loan_to_cost_ratio';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/loan-to-cost-ratio/loan_to_cost_ratio';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
