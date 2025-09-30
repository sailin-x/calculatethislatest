export interface './legal/bad-faith-insurance-calculator/bad-faith-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/bad-faith-insurance-calculator/bad-faith-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/bad-faith-insurance-calculator/bad-faith-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/bad-faith-insurance-calculator/bad-faith-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
