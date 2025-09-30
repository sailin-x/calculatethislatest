export interface './finance/credit-utilization-calculator/CreditUtilizationCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/credit-utilization-calculator/CreditUtilizationCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/credit-utilization-calculator/CreditUtilizationCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/credit-utilization-calculator/CreditUtilizationCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
