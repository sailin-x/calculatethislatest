export interface copyright_registration_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface copyright_registration_calculatorResults {
  result: number;
  analysis?: string;
}

export interface copyright_registration_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface copyright_registration_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
