export interface './finance/cost-of-debt-calculator/cost-of-debt-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cost-of-debt-calculator/cost-of-debt-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cost-of-debt-calculator/cost-of-debt-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cost-of-debt-calculator/cost-of-debt-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
