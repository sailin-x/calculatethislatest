export interface disability_insurance_needs_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface disability_insurance_needs_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface disability_insurance_needs_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface disability_insurance_needs_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
