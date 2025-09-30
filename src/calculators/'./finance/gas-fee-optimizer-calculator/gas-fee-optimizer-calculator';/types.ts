export interface './finance/gas-fee-optimizer-calculator/gas-fee-optimizer-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/gas-fee-optimizer-calculator/gas-fee-optimizer-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/gas-fee-optimizer-calculator/gas-fee-optimizer-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/gas-fee-optimizer-calculator/gas-fee-optimizer-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
