export interface './health/seed-starting-calculator/seed-starting-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/seed-starting-calculator/seed-starting-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/seed-starting-calculator/seed-starting-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/seed-starting-calculator/seed-starting-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
