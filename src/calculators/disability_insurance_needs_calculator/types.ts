export interface disability_insurance_needs_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface disability_insurance_needs_calculatorResults {
  result: number;
  analysis?: string;
}

export interface disability_insurance_needs_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface disability_insurance_needs_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
