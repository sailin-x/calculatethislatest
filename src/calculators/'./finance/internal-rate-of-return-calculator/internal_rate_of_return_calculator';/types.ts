export interface './finance/internal-rate-of-return-calculator/internal_rate_of_return_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/internal-rate-of-return-calculator/internal_rate_of_return_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/internal-rate-of-return-calculator/internal_rate_of_return_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/internal-rate-of-return-calculator/internal_rate_of_return_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
