export interface './finance/college-savings/college-savings';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/college-savings/college-savings';Results {
  result: number;
  analysis?: string;
}

export interface './finance/college-savings/college-savings';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/college-savings/college-savings';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
