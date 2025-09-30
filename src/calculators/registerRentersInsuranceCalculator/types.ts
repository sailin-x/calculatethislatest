export interface registerRentersInsuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRentersInsuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRentersInsuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRentersInsuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
