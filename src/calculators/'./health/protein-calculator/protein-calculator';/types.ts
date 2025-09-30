export interface './health/protein-calculator/protein-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/protein-calculator/protein-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/protein-calculator/protein-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/protein-calculator/protein-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
