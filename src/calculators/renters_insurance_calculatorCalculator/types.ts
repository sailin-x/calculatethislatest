export interface renters_insurance_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface renters_insurance_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface renters_insurance_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface renters_insurance_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
