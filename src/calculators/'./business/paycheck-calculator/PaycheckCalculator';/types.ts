export interface './business/paycheck-calculator/PaycheckCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/paycheck-calculator/PaycheckCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/paycheck-calculator/PaycheckCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/paycheck-calculator/PaycheckCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
