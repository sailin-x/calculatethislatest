export interface './finance/rental-yield/rental-yield';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/rental-yield/rental-yield';Results {
  result: number;
  analysis?: string;
}

export interface './finance/rental-yield/rental-yield';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/rental-yield/rental-yield';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
