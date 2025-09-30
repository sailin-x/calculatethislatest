export interface './finance/net-unrealized-appreciation-nua-tax-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/net-unrealized-appreciation-nua-tax-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/net-unrealized-appreciation-nua-tax-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/net-unrealized-appreciation-nua-tax-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
