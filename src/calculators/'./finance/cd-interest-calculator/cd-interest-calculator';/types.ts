export interface './finance/cd-interest-calculator/cd-interest-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cd-interest-calculator/cd-interest-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cd-interest-calculator/cd-interest-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cd-interest-calculator/cd-interest-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
