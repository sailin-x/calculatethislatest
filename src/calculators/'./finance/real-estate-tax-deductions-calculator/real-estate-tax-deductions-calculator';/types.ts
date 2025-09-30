export interface './finance/real-estate-tax-deductions-calculator/real-estate-tax-deductions-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/real-estate-tax-deductions-calculator/real-estate-tax-deductions-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/real-estate-tax-deductions-calculator/real-estate-tax-deductions-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/real-estate-tax-deductions-calculator/real-estate-tax-deductions-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
