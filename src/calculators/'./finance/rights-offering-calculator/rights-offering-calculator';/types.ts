export interface './finance/rights-offering-calculator/rights-offering-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/rights-offering-calculator/rights-offering-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/rights-offering-calculator/rights-offering-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/rights-offering-calculator/rights-offering-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
