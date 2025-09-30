export interface './finance/net-operating-income/net_operating_income';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/net-operating-income/net_operating_income';Results {
  result: number;
  analysis?: string;
}

export interface './finance/net-operating-income/net_operating_income';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/net-operating-income/net_operating_income';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
