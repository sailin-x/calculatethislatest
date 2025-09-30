export interface './health/pilates-studio-cost-calculator/pilates_studio_cost_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/pilates-studio-cost-calculator/pilates_studio_cost_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/pilates-studio-cost-calculator/pilates_studio_cost_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/pilates-studio-cost-calculator/pilates_studio_cost_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
