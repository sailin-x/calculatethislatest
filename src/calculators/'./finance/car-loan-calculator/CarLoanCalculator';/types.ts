export interface './finance/car-loan-calculator/CarLoanCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/car-loan-calculator/CarLoanCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/car-loan-calculator/CarLoanCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/car-loan-calculator/CarLoanCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
