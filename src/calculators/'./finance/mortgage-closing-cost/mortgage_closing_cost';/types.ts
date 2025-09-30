export interface './finance/mortgage-closing-cost/mortgage_closing_cost';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-closing-cost/mortgage_closing_cost';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-closing-cost/mortgage_closing_cost';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-closing-cost/mortgage_closing_cost';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
