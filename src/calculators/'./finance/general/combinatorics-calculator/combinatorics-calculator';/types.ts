export interface './finance/general/combinatorics-calculator/combinatorics-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/combinatorics-calculator/combinatorics-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/combinatorics-calculator/combinatorics-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/combinatorics-calculator/combinatorics-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
