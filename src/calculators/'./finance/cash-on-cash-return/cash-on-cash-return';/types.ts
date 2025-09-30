export interface './finance/cash-on-cash-return/cash-on-cash-return';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cash-on-cash-return/cash-on-cash-return';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cash-on-cash-return/cash-on-cash-return';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cash-on-cash-return/cash-on-cash-return';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
