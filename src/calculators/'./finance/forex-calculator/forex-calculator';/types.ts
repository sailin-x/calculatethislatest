export interface './finance/forex-calculator/forex-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/forex-calculator/forex-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/forex-calculator/forex-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/forex-calculator/forex-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
