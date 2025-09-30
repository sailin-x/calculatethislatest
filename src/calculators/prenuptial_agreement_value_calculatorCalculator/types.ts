export interface prenuptial_agreement_value_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface prenuptial_agreement_value_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface prenuptial_agreement_value_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface prenuptial_agreement_value_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
