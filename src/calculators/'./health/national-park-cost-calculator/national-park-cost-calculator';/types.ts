export interface './health/national-park-cost-calculator/national-park-cost-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/national-park-cost-calculator/national-park-cost-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/national-park-cost-calculator/national-park-cost-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/national-park-cost-calculator/national-park-cost-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
