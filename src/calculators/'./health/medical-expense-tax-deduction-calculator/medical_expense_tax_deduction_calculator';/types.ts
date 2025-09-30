export interface './health/medical-expense-tax-deduction-calculator/medical_expense_tax_deduction_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/medical-expense-tax-deduction-calculator/medical_expense_tax_deduction_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/medical-expense-tax-deduction-calculator/medical_expense_tax_deduction_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/medical-expense-tax-deduction-calculator/medical_expense_tax_deduction_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
