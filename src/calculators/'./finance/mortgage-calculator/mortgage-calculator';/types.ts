export interface './finance/mortgage-calculator/mortgage-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-calculator/mortgage-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-calculator/mortgage-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-calculator/mortgage-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
