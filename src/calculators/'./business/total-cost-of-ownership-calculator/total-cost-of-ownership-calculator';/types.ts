export interface './business/total-cost-of-ownership-calculator/total-cost-of-ownership-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/total-cost-of-ownership-calculator/total-cost-of-ownership-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/total-cost-of-ownership-calculator/total-cost-of-ownership-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/total-cost-of-ownership-calculator/total-cost-of-ownership-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
