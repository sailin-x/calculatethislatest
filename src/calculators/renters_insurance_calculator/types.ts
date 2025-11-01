export interface renters_insurance_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface renters_insurance_calculatorResults {
  result: number;
  analysis?: string;
}

export interface renters_insurance_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface renters_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
