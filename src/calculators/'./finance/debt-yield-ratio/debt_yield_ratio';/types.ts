export interface './finance/debt-yield-ratio/debt_yield_ratio';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/debt-yield-ratio/debt_yield_ratio';Results {
  result: number;
  analysis?: string;
}

export interface './finance/debt-yield-ratio/debt_yield_ratio';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/debt-yield-ratio/debt_yield_ratio';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
