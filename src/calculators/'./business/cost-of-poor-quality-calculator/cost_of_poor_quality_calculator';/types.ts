export interface './business/cost-of-poor-quality-calculator/cost_of_poor_quality_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/cost-of-poor-quality-calculator/cost_of_poor_quality_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/cost-of-poor-quality-calculator/cost_of_poor_quality_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/cost-of-poor-quality-calculator/cost_of_poor_quality_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
