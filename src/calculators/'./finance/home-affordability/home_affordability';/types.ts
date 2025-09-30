export interface './finance/home-affordability/home_affordability';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/home-affordability/home_affordability';Results {
  result: number;
  analysis?: string;
}

export interface './finance/home-affordability/home_affordability';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/home-affordability/home_affordability';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
