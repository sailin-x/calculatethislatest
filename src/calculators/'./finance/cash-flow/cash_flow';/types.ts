export interface './finance/cash-flow/cash_flow';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cash-flow/cash_flow';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cash-flow/cash_flow';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cash-flow/cash_flow';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
