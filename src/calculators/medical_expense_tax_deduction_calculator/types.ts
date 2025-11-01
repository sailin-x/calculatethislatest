export interface medical_expense_tax_deduction_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface medical_expense_tax_deduction_calculatorResults {
  result: number;
  analysis?: string;
}

export interface medical_expense_tax_deduction_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface medical_expense_tax_deduction_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
