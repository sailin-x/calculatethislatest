export interface './finance/six-sigma-cost-savings-calculator/six-sigma-cost-savings-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/six-sigma-cost-savings-calculator/six-sigma-cost-savings-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/six-sigma-cost-savings-calculator/six-sigma-cost-savings-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/six-sigma-cost-savings-calculator/six-sigma-cost-savings-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
