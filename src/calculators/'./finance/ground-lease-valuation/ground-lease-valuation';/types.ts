export interface './finance/ground-lease-valuation/ground-lease-valuation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/ground-lease-valuation/ground-lease-valuation';Results {
  result: number;
  analysis?: string;
}

export interface './finance/ground-lease-valuation/ground-lease-valuation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/ground-lease-valuation/ground-lease-valuation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
