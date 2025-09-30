export interface medical_expense_tax_deduction_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface medical_expense_tax_deduction_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface medical_expense_tax_deduction_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface medical_expense_tax_deduction_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
