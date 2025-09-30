export interface './finance/debt-avalanche-calculator/debt-avalanche-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/debt-avalanche-calculator/debt-avalanche-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/debt-avalanche-calculator/debt-avalanche-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/debt-avalanche-calculator/debt-avalanche-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
