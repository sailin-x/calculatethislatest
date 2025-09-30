export interface './finance/cost-segregation-depreciation/cost-segregation-depreciation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cost-segregation-depreciation/cost-segregation-depreciation';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cost-segregation-depreciation/cost-segregation-depreciation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cost-segregation-depreciation/cost-segregation-depreciation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
