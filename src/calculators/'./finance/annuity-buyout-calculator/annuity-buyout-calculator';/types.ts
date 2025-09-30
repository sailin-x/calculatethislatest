export interface './finance/annuity-buyout-calculator/annuity-buyout-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/annuity-buyout-calculator/annuity-buyout-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/annuity-buyout-calculator/annuity-buyout-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/annuity-buyout-calculator/annuity-buyout-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
