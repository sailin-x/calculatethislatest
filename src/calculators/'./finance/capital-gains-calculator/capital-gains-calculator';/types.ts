export interface './finance/capital-gains-calculator/capital-gains-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/capital-gains-calculator/capital-gains-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/capital-gains-calculator/capital-gains-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/capital-gains-calculator/capital-gains-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
