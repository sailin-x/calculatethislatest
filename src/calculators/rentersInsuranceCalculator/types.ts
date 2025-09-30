export interface rentersInsuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rentersInsuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface rentersInsuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rentersInsuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
