export interface './finance/cost-segregation-depreciation/cost_segregation_depreciation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cost-segregation-depreciation/cost_segregation_depreciation';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cost-segregation-depreciation/cost_segregation_depreciation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cost-segregation-depreciation/cost_segregation_depreciation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
