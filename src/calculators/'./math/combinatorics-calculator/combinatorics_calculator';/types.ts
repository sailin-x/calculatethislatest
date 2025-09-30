export interface './math/combinatorics-calculator/combinatorics_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/combinatorics-calculator/combinatorics_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/combinatorics-calculator/combinatorics_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/combinatorics-calculator/combinatorics_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
