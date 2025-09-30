export interface realEstateTaxDeductionsCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface realEstateTaxDeductionsCalculatorResults {
  result: number;
  analysis?: string;
}

export interface realEstateTaxDeductionsCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface realEstateTaxDeductionsCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
