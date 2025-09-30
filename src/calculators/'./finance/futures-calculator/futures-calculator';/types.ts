export interface './finance/futures-calculator/futures-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/futures-calculator/futures-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/futures-calculator/futures-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/futures-calculator/futures-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
