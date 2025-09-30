export interface './finance/credit-card-calculator/credit-card-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/credit-card-calculator/credit-card-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/credit-card-calculator/credit-card-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/credit-card-calculator/credit-card-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
