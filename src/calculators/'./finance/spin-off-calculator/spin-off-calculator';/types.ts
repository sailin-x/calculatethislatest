export interface './finance/spin-off-calculator/spin-off-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/spin-off-calculator/spin-off-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/spin-off-calculator/spin-off-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/spin-off-calculator/spin-off-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
