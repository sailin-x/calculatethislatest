export interface './finance/college-savings/college_savings';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/college-savings/college_savings';Results {
  result: number;
  analysis?: string;
}

export interface './finance/college-savings/college_savings';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/college-savings/college_savings';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
