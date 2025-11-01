export interface roth_conversion_tax_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface roth_conversion_tax_calculatorResults {
  result: number;
  analysis?: string;
}

export interface roth_conversion_tax_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface roth_conversion_tax_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
