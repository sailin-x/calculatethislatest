export interface real_estate_tax_deductions_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface real_estate_tax_deductions_calculatorResults {
  result: number;
  analysis?: string;
}

export interface real_estate_tax_deductions_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface real_estate_tax_deductions_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
