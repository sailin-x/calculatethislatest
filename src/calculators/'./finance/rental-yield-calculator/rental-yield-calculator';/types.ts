export interface './finance/rental-yield-calculator/rental-yield-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/rental-yield-calculator/rental-yield-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/rental-yield-calculator/rental-yield-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/rental-yield-calculator/rental-yield-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
