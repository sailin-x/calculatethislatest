export interface './finance/real-estate-tax-deductions-calculator/real_estate_tax_deductions_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/real-estate-tax-deductions-calculator/real_estate_tax_deductions_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/real-estate-tax-deductions-calculator/real_estate_tax_deductions_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/real-estate-tax-deductions-calculator/real_estate_tax_deductions_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
