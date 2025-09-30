export interface real_estate_tax_deductions_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface real_estate_tax_deductions_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface real_estate_tax_deductions_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface real_estate_tax_deductions_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
