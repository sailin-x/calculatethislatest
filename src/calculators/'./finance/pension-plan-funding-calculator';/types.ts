export interface './finance/pension-plan-funding-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/pension-plan-funding-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/pension-plan-funding-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/pension-plan-funding-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
