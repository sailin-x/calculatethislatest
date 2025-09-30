export interface './finance/r-squared-calculator/r-squared-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/r-squared-calculator/r-squared-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/r-squared-calculator/r-squared-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/r-squared-calculator/r-squared-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
