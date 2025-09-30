export interface './health/seed-starting-calculator/seed_starting_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/seed-starting-calculator/seed_starting_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/seed-starting-calculator/seed_starting_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/seed-starting-calculator/seed_starting_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
