export interface roth_conversion_tax_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface roth_conversion_tax_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface roth_conversion_tax_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface roth_conversion_tax_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
