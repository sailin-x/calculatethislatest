export interface titleInsuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface titleInsuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface titleInsuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface titleInsuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
