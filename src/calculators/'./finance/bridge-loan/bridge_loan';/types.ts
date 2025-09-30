export interface './finance/bridge-loan/bridge_loan';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/bridge-loan/bridge_loan';Results {
  result: number;
  analysis?: string;
}

export interface './finance/bridge-loan/bridge_loan';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/bridge-loan/bridge_loan';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
