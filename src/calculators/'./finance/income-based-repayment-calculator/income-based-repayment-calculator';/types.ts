export interface './finance/income-based-repayment-calculator/income-based-repayment-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/income-based-repayment-calculator/income-based-repayment-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/income-based-repayment-calculator/income-based-repayment-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/income-based-repayment-calculator/income-based-repayment-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
