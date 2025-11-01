export interface rights_offering_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface rights_offering_calculatorResults {
  result: number;
  analysis?: string;
}

export interface rights_offering_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface rights_offering_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
