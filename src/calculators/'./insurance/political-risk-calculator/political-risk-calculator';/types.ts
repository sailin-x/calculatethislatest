export interface './insurance/political-risk-calculator/political-risk-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/political-risk-calculator/political-risk-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/political-risk-calculator/political-risk-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/political-risk-calculator/political-risk-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
